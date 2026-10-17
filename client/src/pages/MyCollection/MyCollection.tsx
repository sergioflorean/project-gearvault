import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import Main from "../../components/Main/Main";

import type { CollectionItem } from "../../types/collection";

import { loadCollection, saveCollection } from "../../utils/collectionStorage";

const MyCollection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collection, setCollection] =
    useState<CollectionItem[]>(loadCollection);
  const [editingInstrument, setEditingInstrument] =
    useState<CollectionItem | null>(null);

  const collectionStats = {
    total: collection.length,
    guitars: collection.filter((instrument) => instrument.category === "guitar")
      .length,
    amps: collection.filter((instrument) => instrument.category === "amp")
      .length,
    pedals: collection.filter((instrument) => instrument.category === "pedal")
      .length,
  };

  const handleAddInstrument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const brand = String(formData.get("brand") ?? "").trim();
    const model = String(formData.get("model") ?? "").trim();

    if (!brand || !model) return;

    const yearValue = String(formData.get("year") ?? "").trim();
    const finish = String(formData.get("finish") ?? "").trim();
    const serialNumber = String(formData.get("serialNumber") ?? "").trim();

    const newInstrument: CollectionItem = {
      id: crypto.randomUUID(),
      brand,
      model,
      category: formData.get("category") as CollectionItem["category"],
      year: yearValue ? Number(yearValue) : undefined,
      finish: finish || undefined,
      serialNumber: serialNumber || undefined,
      availability: formData.get(
        "availability",
      ) as CollectionItem["availability"],
      addedAt: new Date().toISOString(),
    };

    const updatedCollection = editingInstrument
      ? collection.map((instrument) =>
          instrument.id === editingInstrument.id
            ? {
                ...instrument,
                ...newInstrument,
                id: instrument.id,
                addedAt: instrument.addedAt,
              }
            : instrument,
        )
      : [...collection, newInstrument];

    saveCollection(updatedCollection);
    setCollection(updatedCollection);

    setIsDialogOpen(false);
  };

  const handleOpenEdit = (instrument: CollectionItem) => {
    setEditingInstrument(instrument);
    setIsDialogOpen(true);
  };

  const handleRemoveInstrument = (id: string) => {
    const confirmed = window.confirm(
      "Remove this instrument from your collection?",
    );

    if (!confirmed) return;

    const updatedCollection = collection.filter(
      (instrument) => instrument.id !== id,
    );

    saveCollection(updatedCollection);
    setCollection(updatedCollection);

    setEditingInstrument(null);
    setIsDialogOpen(false);
  };

  return (
    <Main>
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Box>
            <Typography component="h1" variant="h4">
              My Collection
            </Typography>

            <Typography color="text.secondary">
              Your personal gear library.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              setEditingInstrument(null);
              setIsDialogOpen(true);
            }}
            sx={{ textTransform: "none" }}
          >
            Add Instrument
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 2, sm: 4 },
            py: 1,
          }}
        >
          {[
            {
              singular: "Guitar",
              plural: "Guitars",
              value: collectionStats.guitars,
            },
            {
              singular: "Amp",
              plural: "Amps",
              value: collectionStats.amps,
            },
            {
              singular: "Pedal",
              plural: "Pedals",
              value: collectionStats.pedals,
            },
          ]
            .filter((stat) => stat.value > 0)
            .map((stat) => (
              <Box
                key={stat.plural}
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 1,
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{stat.value}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {stat.value === 1 ? stat.singular : stat.plural}
                </Typography>
              </Box>
            ))}
        </Box>

        {collection.length === 0 ? (
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              p: 5,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Your collection is empty</Typography>

            <Typography color="text.secondary">
              Add your first instrument to get started.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {collection.map((instrument) => (
              <Box
                key={instrument.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "4 / 3",
                    bgcolor: "action.hover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Your photos coming in Stage 2
                  </Typography>
                </Box>

                <Stack spacing={1} sx={{ p: 3 }}>
                  <Typography variant="overline" color="text.secondary">
                    {instrument.brand}
                  </Typography>

                  <Typography variant="h6">{instrument.model}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {instrument.year ?? "Year unknown"}
                    {instrument.finish ? ` · ${instrument.finish}` : ""}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {instrument.category.toUpperCase()}
                  </Typography>
                  <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    onClick={() => handleOpenEdit(instrument)}
                    sx={{
                      alignSelf: "flex-start",
                      textTransform: "none",
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
      </Stack>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingInstrument ? "Edit Instrument" : "Add Instrument"}
        </DialogTitle>

        <DialogContent>
          <Stack
            component="form"
            key={editingInstrument?.id ?? "new"}
            id="add-instrument-form"
            spacing={2}
            sx={{ pt: 1 }}
            onSubmit={handleAddInstrument}
          >
            <TextField
              name="brand"
              label="Brand"
              placeholder="e.g. Gibson"
              defaultValue={editingInstrument?.brand ?? ""}
              required
              fullWidth
            />

            <TextField
              name="model"
              label="Model"
              placeholder="e.g. Les Paul Junior"
              defaultValue={editingInstrument?.model ?? ""}
              required
              fullWidth
            />

            <TextField
              name="category"
              label="Category"
              select
              defaultValue={editingInstrument?.category ?? "guitar"}
              required
              fullWidth
            >
              <MenuItem value="guitar">Guitar</MenuItem>
              <MenuItem value="amp">Amplifier</MenuItem>
              <MenuItem value="pedal">Pedal</MenuItem>
            </TextField>

            <TextField
              name="year"
              label="Year"
              type="number"
              defaultValue={editingInstrument?.year ?? ""}
              placeholder="e.g. 2011"
              fullWidth
            />

            <TextField
              name="finish"
              label="Finish"
              placeholder="e.g. TV Yellow"
              defaultValue={editingInstrument?.finish ?? ""}
              fullWidth
            />

            <TextField
              name="serialNumber"
              label="Serial Number"
              placeholder="Enter serial number"
              defaultValue={editingInstrument?.serialNumber ?? ""}
              fullWidth
            />

            <TextField
              name="availability"
              label="Availability"
              select
              defaultValue={editingInstrument?.availability ?? "not_for_sale"}
              fullWidth
            >
              <MenuItem value="not_for_sale">Not for sale</MenuItem>
              <MenuItem value="for_sale">For sale</MenuItem>
              <MenuItem value="open_to_trade">Open to trade</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          {editingInstrument && (
            <Button
              type="button"
              size="small"
              color="error"
              onClick={() => handleRemoveInstrument(editingInstrument.id)}
              sx={{
                mr: "auto",
                textTransform: "none",
                color: "error.main",
              }}
            >
              Delete Instrument
            </Button>
          )}
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>

          <Button variant="contained" type="submit" form="add-instrument-form">
            {editingInstrument ? "Save Changes" : "Save Instrument"}
          </Button>
        </DialogActions>
      </Dialog>
    </Main>
  );
};

export default MyCollection;
