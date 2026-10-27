import { useEffect, useState, type FormEvent } from "react";
import { Alert, Box, Button, Stack, Typography, Snackbar } from "@mui/material";
import Main from "../../components/Main/Main";
import GearCard from "../../components/GearCard/GearCard";
import InstrumentFormDialog from "../../components/InstrumentFormDialog/InstrumentFormDialog";
import { parseInstrumentForm } from "../../utils/instrumentForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createInstrument, getMyInstruments } from "../../utils/instrumentsApi";

import type { CollectionItem } from "../../types/collection";

const MyCollection = () => {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigationMessage =
    (location.state as { successMessage?: string } | null)?.successMessage ??
    "";

  const notificationMessage = successMessage || navigationMessage;

  const handleCloseNotification = () => {
    setSuccessMessage("");

    if (navigationMessage) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  };

  useEffect(() => {
    if (!token) return;

    let isActive = true;

    const loadInstruments = async () => {
      try {
        const instruments = await getMyInstruments(token);

        if (isActive) {
          setCollection(instruments);
        }
      } catch (err: unknown) {
        if (isActive) {
          setLoadError(
            err instanceof Error ? err.message : "Could not load instruments.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadInstruments();

    return () => {
      isActive = false;
    };
  }, [token]);

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

  const handleAddInstrument = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token || isSaving) return;

    const formData = new FormData(event.currentTarget);
    const instrumentData = parseInstrumentForm(formData);

    if (!instrumentData.brand || !instrumentData.model) return;

    setIsSaving(true);
    setSaveError("");

    try {
      const savedInstrument = await createInstrument(token, instrumentData);

      setCollection((current) => [savedInstrument, ...current]);
      setIsDialogOpen(false);
      setSuccessMessage("Instrument added successfully.");
    } catch (err: unknown) {
      setSaveError(
        err instanceof Error ? err.message : "Could not save instrument.",
      );
    } finally {
      setIsSaving(false);
    }
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
              setSaveError("");
              setIsDialogOpen(true);
            }}
            sx={{ textTransform: "none" }}
            disabled={isSaving}
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

        {isLoading ? (
          <Typography color="text.secondary">
            Loading your collection...
          </Typography>
        ) : loadError ? (
          <Alert severity="error">{loadError}</Alert>
        ) : collection.length === 0 ? (
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
        isSubmitting={isSaving}
        error={saveError}
      />
      <Snackbar
        open={Boolean(notificationMessage)}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleCloseNotification}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Main>
  );
};

export default MyCollection;
