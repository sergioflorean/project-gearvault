import { Box, Chip, Stack, Typography } from "@mui/material";
import type { GearPreview } from "../../types/gear";

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
        sx={{
          aspectRatio: "4 / 3",
          backgroundColor: "#ececea",
        }}
      />

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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {gear.brand}
            </Typography>

            <Typography
              component="h2"
              variant="h6"
              sx={{ fontWeight: 600, overflowWrap: "anywhere" }}
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

        <Typography variant="body2" color="text.secondary">
          {gear.year ?? "Year unknown"}
          {gear.finish ? ` · ${gear.finish}` : ""}
        </Typography>
      </Stack>
    </Box>
  );
};

export default GearCard;
