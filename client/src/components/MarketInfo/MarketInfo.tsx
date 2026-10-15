import { Box, Stack, Typography } from "@mui/material";
import type { GearMarketData } from "../../types/gear";

interface MarketInfoProps {
  gearName: string;
  marketData?: GearMarketData;
}

const MarketInfo = ({ gearName, marketData }: MarketInfoProps) => {
  const listingsCount = marketData?.listings.length ?? 0;

  return (
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
        Market Information
      </Typography>

      {listingsCount > 0 ? (
        <Typography variant="body2" color="text.secondary">
          {listingsCount} {listingsCount === 1 ? "listing" : "listings"}{" "}
          available from Reverb for {gearName}.
        </Typography>
      ) : (
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Market data unavailable
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Reverb market insights for {gearName} are coming soon.
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default MarketInfo;
