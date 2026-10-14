import { Stack, Typography } from "@mui/material";
import Main from "../../components/Main/Main";

const About = () => {
  return (
    <Main>
      <Stack spacing={3} sx={{ maxWidth: 760 }}>
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
          About GearVault
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
          }}
        >
          GearVault is a platform for musicians to catalog, identify, and
          manage their gear while keeping track of market information and
          availability.
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: "1.125rem",
            lineHeight: 1.8,
          }}
        >
          The project is being built as a full-stack application using React,
          TypeScript, MUI, Node.js, Express, MongoDB, and the Reverb API.
        </Typography>
      </Stack>
    </Main>
  );
};

export default About;