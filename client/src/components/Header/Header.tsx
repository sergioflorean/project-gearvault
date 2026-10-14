import { Box, Container, Stack, Typography } from "@mui/material";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={2}
  sx={{
    py: 2,
    alignItems: {
      xs: "flex-start",
      sm: "center",
    },
    justifyContent: "space-between",
  }}
>
          <Typography
            component="div"
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            GearVault
          </Typography>

          <Navigation />
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;