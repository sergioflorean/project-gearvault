import { Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {
  const { token, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <Stack
      component="nav"
      direction="row"
      spacing={1}
      sx={{
        flexWrap: "wrap",
      }}
    >
      <Button component={Link} to="/" color="inherit">
        Explore
      </Button>
      <Button component={Link} to="/my-collection" color="inherit">
        My Collection
      </Button>
      <Button component={Link} to="/about" color="inherit">
        About
      </Button>
      {token && user && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            alignSelf: "center",
            px: 1,
            overflowWrap: "anywhere",
          }}
        >
          {user.name}
        </Typography>
      )}
      {token ? (
        <Button onClick={handleSignOut} variant="contained">
          Sign Out
        </Button>
      ) : (
        <Button component={Link} to="/signin" variant="contained">
          Sign In
        </Button>
      )}
    </Stack>
  );
};

export default Navigation;
