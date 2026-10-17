import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Link,
  Button,
} from "@mui/material";
import type { GearMarketData } from "../../types/gear";
import { useState } from "react";

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
  const listings = marketData?.listings ?? [];
  const listingsCount = listings.length;

  const [showAll, setShowAll] = useState(false);
  const INITIAL_LISTINGS = 2;
  const visibleListings = showAll
    ? listings
    : listings.slice(0, INITIAL_LISTINGS);

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
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {listingsCount} {listingsCount === 1 ? "listing" : "listings"}{" "}
            available from Reverb for {gearName}.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Third-party Reverb listings, separate from the owner's availability
            status.
          </Typography>

          {visibleListings.map((listing, index) => (
            <Stack
              key={`${listing.title}-${index}`}
              spacing={0.5}
              sx={{ py: 1 }}
            >
              {listing.url ? (
                <Link
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="text.primary"
                  variant="body2"
                >
                  {listing.title}
                </Link>
              ) : (
                <Typography variant="body2">{listing.title}</Typography>
              )}

              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {listing.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: listing.currency,
                })}{" "}
                {listing.currency}
              </Typography>
            </Stack>
          ))}
          {listingsCount > INITIAL_LISTINGS && (
            <Button
              variant="text"
              size="small"
              onClick={() => setShowAll((prev) => !prev)}
              sx={{
                alignSelf: "flex-start",
                textTransform: "none",
                px: 0,
              }}
            >
              {showAll
                ? "Show Less"
                : `Show More (${listingsCount - INITIAL_LISTINGS} more)`}
            </Button>
          )}
        </Stack>
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
