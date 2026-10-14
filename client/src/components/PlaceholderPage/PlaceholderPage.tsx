import { Stack, Typography } from "@mui/material";
import Main from "../Main/Main";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({
  title,
  description,
}: PlaceholderPageProps) => {
  return (
    <Main>
      <Stack spacing={2} sx={{ maxWidth: 760 }}>
        <Typography
          component="h1"
          variant="h2"
          sx={{
            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4rem",
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Main>
  );
};

export default PlaceholderPage;