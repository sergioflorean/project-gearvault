import { Box, Chip, Stack, Typography } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import type { GearPreview } from "../../types/gear";
import AvailabilityBadge from "../AvailabilityBadge/AvailabilityBadge";
import { Link } from "react-router-dom";

interface GearCardProps {
  gear: GearPreview;
}

const GearCard = ({ gear }: GearCardProps) => {
  return (
    <Box
      component="article"
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        backgroundColor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Box
        component={Link}
        to={`/gear/${gear.id}`}
        state={{ fromExplore: true }}
        sx={{
          display: "block",
          height: "100%",
          color: "inherit",
          textDecoration: "none",
          borderRadius: 3,

          "&:hover": {
            outline: "1px solid",
            outlineColor: "text.secondary",
            outlineOffset: "-1px",
          },

          "&:focus-visible": {
            outline: "1px solid",
            outlineColor: "primary.main",
            outlineOffset: "-1px",
          },
        }}
      >
        <Box
          sx={{
            aspectRatio: "4 / 3",
            backgroundColor: "#ececea",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
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
                  fontSize: 40,
                  color: "text.secondary",
                }}
              />

              <Typography variant="body2" color="text.secondary">
                Photo coming soon
              </Typography>
            </Stack>
          )}
        </Box>

        <Stack
          spacing={1.5}
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
            },
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {gear.brand}
              </Typography>

              <Typography
                component="h2"
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "1.25rem",
                    sm: "1.375rem",
                  },
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "-0.025em",
                  overflowWrap: "anywhere",
                }}
              >
                {gear.model}
              </Typography>
            </Box>

            <Chip
              size="small"
              label={gear.category}
              sx={{ textTransform: "capitalize" }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "0.01em",
            }}
          >
            {gear.year ?? "Year unknown"}
            {gear.finish ? ` · ${gear.finish}` : ""}
          </Typography>
          <Box>
            <AvailabilityBadge availability={gear.availability} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default GearCard;
