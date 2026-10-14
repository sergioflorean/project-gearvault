import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Button component={Link} to="/" color="inherit">Explore</Button>
      <Button component={Link} to="/about" color="inherit">About</Button>
      <Button component={Link} to="/signin" variant="contained">Sign In</Button>
    </Stack>
  );
};

export default Navigation;