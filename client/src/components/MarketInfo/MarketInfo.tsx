import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import type { GearMarketData } from "../../types/gear";

interface MarketInfoProps {
  gearName: string;
  marketData?: GearMarketData;
  isLoading?: boolean;
  isEmpty?: boolean;
  hasError?: boolean;
}

const MarketInfo = ({
  gearName,
  marketData,
  isLoading = false,
  isEmpty = false,
  hasError = false,
}: MarketInfoProps) => {
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

      {isLoading ? (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <CircularProgress size={20} color="inherit" />

          <Typography variant="body2" color="text.secondary">
            Loading market information...
          </Typography>
        </Stack>
      ) : hasError ? (
        <Typography variant="body2" color="error">
          Something went wrong while fetching market data. Please check your
          connection or try again later.
        </Typography>
      ) : listingsCount > 0 ? (
        <Typography variant="body2" color="text.secondary">
          {listingsCount} {listingsCount === 1 ? "listing" : "listings"}{" "}
          available from Reverb for {gearName}.
        </Typography>
      ) : isEmpty ? (
        <Typography variant="body2" color="text.secondary">
          No listings found on Reverb for {gearName}.
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
