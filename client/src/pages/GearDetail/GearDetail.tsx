import {
  Box,
  Chip,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import { mockGear } from "../../utils/mockGear";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AvailabilityBadge from "../../components/AvailabilityBadge/AvailabilityBadge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MarketInfo from "../../components/MarketInfo/MarketInfo";
import { useEffect, useState, useMemo, type FormEvent } from "react";
import { fetchReverbListings } from "../../utils/reverbApi";
import { mapReverbListingsToMarketData } from "../../utils/reverbMapper";
import {
  getInstrumentById,
  getPublicInstrumentById,
  updateInstrument,
  deleteInstrument,
} from "../../utils/instrumentsApi";
import { parseInstrumentForm } from "../../utils/instrumentForm";
import InstrumentFormDialog from "../../components/InstrumentFormDialog/InstrumentFormDialog";

import { useAuth } from "../../context/AuthContext";

import type { CollectionItem } from "../../types/collection";
import type { GearMarketData, GearPreview } from "../../types/gear";

const GearDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromCollection = location.state?.fromCollection === true;
  const { token } = useAuth();

  const [publicGear, setPublicGear] = useState<GearPreview | null>(null);

  const [ownedGear, setOwnedGear] = useState<{
    token: string;
    instrument: CollectionItem;
  } | null>(null);

  const collectionGear =
    ownedGear?.token === token ? ownedGear.instrument : null;
  const [detailError, setDetailError] = useState("");

  const [marketResult, setMarketResult] = useState<{
    queryKey: string;
    status: "success" | "error";
    data?: GearMarketData;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const originalGear = useMemo(
    () => mockGear.find((item) => item.id === id),
    [id],
  );

  const gear =
    collectionGear?.id === id
      ? collectionGear
      : publicGear?.id === id
        ? publicGear
        : originalGear;

  const gearId = gear?.id;
  const brand = gear?.brand;
  const model = gear?.model;
  const category = gear?.category;

  const marketKey =
    gearId && brand && model && category
      ? JSON.stringify([gearId, brand, model, category])
      : null;

  useEffect(() => {
    if (!id || originalGear) return;

    let isActive = true;

    const loadPublicInstrument = async () => {
      try {
        const instrument = await getPublicInstrumentById(id);

        if (isActive) {
          setPublicGear(instrument);
          setDetailError("");
        }
      } catch (err: unknown) {
        if (isActive) {
          setDetailError(
            err instanceof Error ? err.message : "Could not load instrument.",
          );
        }
      }
    };

    void loadPublicInstrument();

    return () => {
      isActive = false;
    };
  }, [id, originalGear]);
  useEffect(() => {
    if (!id || !token || originalGear) return;

    let isActive = true;

    const checkOwnership = async () => {
      try {
        const instrument = await getInstrumentById(token, id);

        if (isActive) {
          setOwnedGear({ token, instrument });
        }
      } catch {
        if (isActive) {
          setOwnedGear(null);
        }
      }
    };

    void checkOwnership();

    return () => {
      isActive = false;
    };
  }, [id, token, originalGear]);

  const isOwner = Boolean(
    token && collectionGear && gear?.id === collectionGear.id,
  );

  const marketStatus =
    marketKey && marketResult?.queryKey === marketKey
      ? marketResult.status
      : "loading";

  useEffect(() => {
    if (!marketKey || !brand || !model || !category) return;

    let isActive = true;

    const loadListings = async () => {
      try {
        const response = await fetchReverbListings(brand, model, category);

        const mappedData = mapReverbListingsToMarketData(
          response,
          brand,
          model,
        );

        if (isActive) {
          setMarketResult({
            queryKey: marketKey,
            status: "success",
            data: mappedData,
          });
        }
      } catch (error) {
        if (isActive) {
          console.error("Error loading Reverb listings:", error);

          setMarketResult({
            queryKey: marketKey,
            status: "error",
          });
        }
      }
    };

    void loadListings();

    return () => {
      isActive = false;
    };
  }, [marketKey, brand, model, category]);
  const identification = gear?.identification;
  const hasIdentification = Boolean(
    identification &&
    (identification.manufacturingYear !== undefined ||
      identification.country ||
      identification.factory),
  );
  const handleBack = () => {
    if (fromCollection) {
      navigate("/my-collection");
    } else if (location.state?.fromExplore) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleSaveInstrument = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!gear || !isOwner || !token || isSaving) return;

    const formData = new FormData(event.currentTarget);
    const instrumentData = parseInstrumentForm(formData);

    if (!instrumentData.brand || !instrumentData.model) return;

    setIsSaving(true);
    setEditError("");

    try {
      const updatedInstrument = await updateInstrument(
        token,
        gear.id,
        instrumentData,
      );

      setOwnedGear({ token, instrument: updatedInstrument });
      setIsEditDialogOpen(false);
      setSuccessMessage("Instrument updated successfully.");
    } catch (err: unknown) {
      setEditError(
        err instanceof Error ? err.message : "Could not update instrument.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInstrument = async (instrumentId: string) => {
    if (!token || !isOwner || gear?.id !== instrumentId || isDeleting) {
      return;
    }

    const confirmed = window.confirm(
      "Remove this instrument from your collection?",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteInstrument(token, instrumentId);

      navigate("/my-collection", {
        state: {
          successMessage: "Instrument deleted successfully.",
        },
      });
    } catch (err: unknown) {
      setDeleteError(
        err instanceof Error ? err.message : "Could not delete instrument.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const isLoadingDetail = Boolean(id && !originalGear && !gear && !detailError);

  return (
    <Main>
      {isLoadingDetail ? (
        <Typography color="text.secondary">Loading instrument...</Typography>
      ) : detailError ? (
        <Typography color="error">{detailError}</Typography>
      ) : gear ? (
        <Stack spacing={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {deleteError && !isEditDialogOpen && (
              <Alert severity="error">{deleteError}</Alert>
            )}
            <Button
              onClick={handleBack}
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "text.secondary",
                textTransform: "none",
              }}
            >
              {fromCollection ? "Back to My Collection" : "Back to Explore"}
            </Button>

            {isOwner && (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<MoreHorizIcon />}
                  onClick={(event) => setMenuAnchor(event.currentTarget)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    borderColor: "divider",
                    fontWeight: 500,
                  }}
                >
                  Manage
                </Button>

                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setMenuAnchor(null);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    disabled={isDeleting || isSaving}
                    onClick={() => {
                      setMenuAnchor(null);
                      handleDeleteInstrument(gear.id);
                    }}
                    sx={{ color: "error.main" }}
                  >
                    Delete Instrument
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          <Box>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              GEAR DETAILS
            </Typography>
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                },
                fontWeight: 600,
                letterSpacing: "-0.035em",
                mb: 2,
              }}
            >
              {gear.brand} {gear.model}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={gear.category}
                size="small"
                sx={{ textTransform: "capitalize" }}
              />
              <Typography variant="body2" color="text.secondary">
                {gear.year ?? "Year unknown"}
                {gear.finish ? ` · ${gear.finish}` : ""}
              </Typography>
              <AvailabilityBadge availability={gear.availability} />
            </Stack>
          </Box>
          <Box
            sx={{
              width: "100%",
              maxWidth: 720,
              aspectRatio: "4 / 3",
              backgroundColor: "#ececea",
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {gear.imageUrl ? (
              <Box
                component="img"
                src={gear.imageUrl}
                alt={`${gear.brand} ${gear.model}${gear.finish ? ` in ${gear.finish}` : ""}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Stack spacing={1} sx={{ alignItems: "center" }}>
                <ImageOutlinedIcon
                  sx={{
                    fontSize: 48,
                    color: "text.secondary",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Photo coming soon
                </Typography>
              </Stack>
            )}
          </Box>
          <Box
            component="section"
            sx={{
              maxWidth: 720,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              backgroundColor: "background.paper",
              p: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              sx={{
                mb: 3,
              }}
            >
              Specifications
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Brand
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>{gear.brand}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Model
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>{gear.model}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Year
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {gear.year ?? "Unknown"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Finish
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {gear.finish ?? "Unknown"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            component="section"
            sx={{
              maxWidth: 720,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              backgroundColor: "background.paper",
              p: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              Identification
            </Typography>
            {hasIdentification && identification ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 3,
                }}
              >
                {identification.manufacturingYear !== undefined && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Manufacturing year
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {identification.manufacturingYear}
                    </Typography>
                  </Box>
                )}
                {identification.country && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Country
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {identification.country}
                    </Typography>
                  </Box>
                )}
                {identification.factory && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Factory
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {identification.factory}
                    </Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Manufacturing details will appear here when available.
              </Typography>
            )}
            <Box
              sx={{
                mt: 3,
                pt: 3,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Serial number identification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Coming soon. Serial number decoding will be available in a
                future update.
              </Typography>
            </Box>
          </Box>
          <MarketInfo
            gearName={`${gear.brand} ${gear.model}`}
            marketData={
              marketResult?.queryKey === marketKey
                ? marketResult.data
                : undefined
            }
            isLoading={marketStatus === "loading"}
            isEmpty={
              marketStatus === "success" &&
              marketResult?.data?.listings.length === 0
            }
            hasError={marketStatus === "error"}
          />
          {isOwner && (
            <InstrumentFormDialog
              open={isEditDialogOpen}
              instrument={collectionGear}
              onClose={() => {
                setIsEditDialogOpen(false);
                setEditError("");
              }}
              onSubmit={handleSaveInstrument}
              onDelete={handleDeleteInstrument}
              isSubmitting={isSaving || isDeleting}
              error={editError || deleteError}
            />
          )}
        </Stack>
      ) : (
        <Stack
          spacing={2}
          sx={{
            minHeight: 280,
            maxWidth: 560,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
            Gear not found
          </Typography>
          <Typography color="text.secondary">
            We couldn't find this instrument. The link may be incorrect or the
            item may no longer be available.
          </Typography>
          <Button component={Link} to="/" variant="contained">
            Back to Explore
          </Button>
        </Stack>
      )}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Main>
  );
};
export default GearDetail;
