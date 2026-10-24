import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
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
        {children}
      </Container>
    </Box>
  );
};

export default Main;