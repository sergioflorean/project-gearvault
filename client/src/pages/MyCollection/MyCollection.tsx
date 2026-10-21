import { useState, type FormEvent } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Main from "../../components/Main/Main";
import GearCard from "../../components/GearCard/GearCard";
import InstrumentFormDialog from "../../components/InstrumentFormDialog/InstrumentFormDialog";

import type { CollectionItem } from "../../types/collection";

import { loadCollection, saveCollection } from "../../utils/collectionStorage";

const MyCollection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collection, setCollection] =
    useState<CollectionItem[]>(loadCollection);

  const collectionStats = {
    total: collection.length,
    guitars: collection.filter((instrument) => instrument.category === "guitar")
      .length,
    amps: collection.filter((instrument) => instrument.category === "amp")
      .length,
    pedals: collection.filter((instrument) => instrument.category === "pedal")
      .length,
  };

  const sortedCollection = [...collection].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
  );

  const handleAddInstrument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const brand = String(formData.get("brand") ?? "").trim();
    const model = String(formData.get("model") ?? "").trim();

    if (!brand || !model) return;

    const yearValue = String(formData.get("year") ?? "").trim();
    const finish = String(formData.get("finish") ?? "").trim();
    const serialNumber = String(formData.get("serialNumber") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();

    const newInstrument: CollectionItem = {
      id: crypto.randomUUID(),
      brand,
      model,
      category: formData.get("category") as CollectionItem["category"],
      year: yearValue ? Number(yearValue) : undefined,
      finish: finish || undefined,
      serialNumber: serialNumber || undefined,
      imageUrl: imageUrl || undefined,
      availability: formData.get(
        "availability",
      ) as CollectionItem["availability"],
      addedAt: new Date().toISOString(),
    };

    const updatedCollection = [...collection, newInstrument];

    saveCollection(updatedCollection);
    setCollection(updatedCollection);

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
            {sortedCollection.map((instrument) => (
              <GearCard
                key={instrument.id}
                gear={instrument}
                source="collection"
              />
            ))}
          </Box>
        )}
      </Stack>

      <InstrumentFormDialog
        open={isDialogOpen}
        instrument={null}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddInstrument}
      />
    </Main>
  );
};

export default MyCollection;
