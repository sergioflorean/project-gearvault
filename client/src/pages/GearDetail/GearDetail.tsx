import { Box, Chip, Stack, Typography, Button } from "@mui/material";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import { mockGear } from "../../utils/mockGear";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AvailabilityBadge from "../../components/AvailabilityBadge/AvailabilityBadge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GearDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const gear = mockGear.find((item) => item.id === id);

  const handleBackToExplore = () => {
    if (location.state?.fromExplore) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Main>
      {gear ? (
        <Stack spacing={4}>
          <Button
            onClick={handleBackToExplore}
            variant="text"
            startIcon={<ArrowBackIcon />}
            sx={{
              alignSelf: "flex-start",
              color: "text.secondary",
              textTransform: "none",
            }}
          >
            Back to Explore
          </Button>

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
    </Main>
  );
};

export default GearDetail;
