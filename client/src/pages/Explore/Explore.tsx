import {
  Stack,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import Main from "../../components/Main/Main";
import GearCard from "../../components/GearCard/GearCard";
import { mockGear } from "../../utils/mockGear";

const Explore = () => {
  const isLoading = false;
  const hasResults = mockGear.length > 0;
  return (
    <Main>
      <Stack spacing={3} sx={{ maxWidth: 760 }}>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.75rem",
              sm: "4rem",
              md: "5rem",
            },
            lineHeight: 1,
          }}
        >
          Your gear, identified.
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 620,
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Catalog your gear, identify your instruments, track market
          information, and manage your collection in one place.
        </Typography>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search by brand, model, or category"
        variant="outlined"
        sx={{
          maxWidth: 640,
        }}
      />

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : hasResults ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 3,
          }}
        >
          {mockGear.map((gear) => (
            <GearCard key={gear.id} gear={gear} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">No gear found</Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Try a different search or check back later.
          </Typography>
        </Box>
      )}
    </Main>
  );
};

export default Explore;
