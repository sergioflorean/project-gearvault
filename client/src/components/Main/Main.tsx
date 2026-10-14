import { Box, Container, Stack, Typography } from "@mui/material";

const Main = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: 6,
            sm: 8,
            md: 10,
          },
        }}
      >
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
      </Container>
    </Box>
  );
};

export default Main;