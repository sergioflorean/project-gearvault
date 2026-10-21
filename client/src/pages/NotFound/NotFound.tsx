import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Main from "../../components/Main/Main";

interface NotFoundProps {
  title?: string;
  message?: string;
}

const NotFound = ({
  title = "Page not found",
  message = "We couldn't find this page. The URL may be incorrect or the page may have moved.",
}: NotFoundProps) => {
  return (
    <Main>
      <Stack
        spacing={2}
        sx={{
          minHeight: 280,
          maxWidth: 560,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.18em",
          }}
        >
          404 · NOT FOUND
        </Typography>

        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Typography color="text.secondary">{message}</Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Back to Explore
        </Button>
      </Stack>
    </Main>
  );
};

export default NotFound;
