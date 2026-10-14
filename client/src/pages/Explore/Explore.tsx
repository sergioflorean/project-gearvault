import { Stack, Typography } from "@mui/material";
import Main from "../../components/Main/Main";

const Explore = () => {
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
    </Main>
  );
};

export default Explore;