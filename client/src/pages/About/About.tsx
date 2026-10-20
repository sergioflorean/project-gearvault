import { Box, Stack, Typography, Link } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import Main from "../../components/Main/Main";

const About = () => {
  return (
    <Main>
      <Stack spacing={{ xs: 4, sm: 6 }}>
        {/* SECTION 1: INTRODUCTION */}

        <Stack spacing={2.5} sx={{ maxWidth: 760 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            ABOUT GEARVAULT
          </Typography>

          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              fontWeight: 600,
              letterSpacing: "-0.035em",
            }}
          >
            Catalog. Identify. Manage.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              lineHeight: 1.8,
            }}
          >
            GearVault is a platform for guitarists to explore, catalog, and
            manage guitars, amplifiers, and pedals. Build your personal
            collection, explore a demo gear catalog, and view live marketplace
            listings from Reverb. Authentication, photo uploads, and shared
            community data are planned for Stage 2.
          </Typography>
        </Stack>

        {/* SECTION 2: MAIN FEATURES */}

        <Box component="section" sx={{ maxWidth: 900 }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 3,
            }}
          >
            What you can do with GearVault
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <Inventory2OutlinedIcon color="action" />

                <Typography variant="h6">Your collection</Typography>

                <Typography variant="body2" color="text.secondary">
                  Build a personal catalog of your guitars, amplifiers, and
                  pedals.
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <SearchOutlinedIcon color="action" />

                <Typography variant="h6">Gear identification</Typography>

                <Typography variant="body2" color="text.secondary">
                  Explore live marketplace listings and asking prices from
                  Reverb, with results matched to each instrument's brand and
                  model.
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <SwapHorizOutlinedIcon color="action" />

                <Typography variant="h6">Sell or trade</Typography>

                <Typography variant="body2" color="text.secondary">
                  Indicate whether your gear is not for sale, available for
                  sale, or open to trade.
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <InsightsOutlinedIcon color="action" />

                <Typography variant="h6">Market insights</Typography>

                <Typography variant="body2" color="text.secondary">
                  Explore market listings and pricing information as data
                  integrations become available.
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* SECTION 3: TECHNOLOGY STACK */}

        <Box component="section" sx={{ maxWidth: 900 }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Technology stack
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            <Box
              sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 3 }}
            >
              <Stack spacing={1.5}>
                <Typography variant="overline" color="text.secondary">
                  CURRENT
                </Typography>

                <Typography variant="h6">Frontend</Typography>

                <Typography variant="body2" color="text.secondary">
                  React · TypeScript · Vite · MUI · React Router
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 3 }}
            >
              <Stack spacing={1.5}>
                <Typography variant="overline" color="text.secondary">
                  PLANNED
                </Typography>

                <Typography variant="h6">Backend</Typography>

                <Typography variant="body2" color="text.secondary">
                  Node.js · Express · MongoDB
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{ border: 1, borderColor: "divider", borderRadius: 3, p: 3 }}
            >
              <Stack spacing={1.5}>
                <Typography variant="overline" color="text.secondary">
                  CURRENT
                </Typography>

                <Typography variant="h6">Market integration</Typography>

                <Typography variant="body2" color="text.secondary">
                  Reverb API
                </Typography>

                <Typography variant="h6">Market integration</Typography>

                <Typography variant="body2" color="text.secondary">
                  Reverb API
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: 900,
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              GearVault is currently a frontend prototype. Personal collection
              management and live Reverb market listings are implemented. User
              authentication, serial number decoding, photo uploads, and shared
              community data are planned for Stage 2.
            </Typography>

            <Box component="section" aria-labelledby="about-author-heading">
              <Typography
                id="about-author-heading"
                component="h2"
                variant="h6"
                sx={{ mb: 1 }}
              >
                About the Author
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                GearVault was developed as part of the TripleTen Software
                Engineering program. The project combines a passion for guitars
                and music equipment with frontend development using React,
                TypeScript, and modern web technologies.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Developed by Sergio ·{" "}
                <Link
                  href="https://github.com/sergioflorean"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="text.primary"
                >
                  GitHub
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* SECTION 4: FUTURE FEATURES */}

        <Box component="section" sx={{ maxWidth: 900 }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            What's next
          </Typography>

          <Stack
            spacing={3}
            sx={{
              borderTop: 1,
              borderColor: "divider",
              pt: 3,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: "0.12em" }}
              >
                PLANNED · AI FEATURE
              </Typography>

              <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                Tone Hunter
              </Typography>

              <Typography variant="body2" color="text.secondary">
                An AI-assisted tool for exploring guitar, amplifier, and pedal
                combinations based on a target sound. Tone Hunter is planned for
                a future release.
              </Typography>
            </Box>

            <Box>
              <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                Serial number identification
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Identify manufacturing year, country, and factory information
                when supported by available manufacturer data and serial number
                rules.
              </Typography>
            </Box>

            <Box>
              <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                Community features
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Discover instruments available for sale or trade and connect
                with other gear enthusiasts.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Main>
  );
};

export default About;
