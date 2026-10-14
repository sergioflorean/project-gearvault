import { Button, Stack } from "@mui/material";

const Navigation = () => {
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={1}
      sx={{
        flexWrap: "wrap",
      }}
    >
      <Button color="inherit">Explore</Button>
      <Button color="inherit">About</Button>
      <Button variant="contained">Sign In</Button>
    </Stack>
  );
};

export default Navigation;