import {
  Stack,
  Typography,
  Box,
  TextField,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Main from "../../components/Main/Main";
import GearCard from "../../components/GearCard/GearCard";
import { getExploreGear } from "../../utils/exploreGear";
import { useSearchParams } from "react-router-dom";

type CategoryFilter = "all" | "guitar" | "amp" | "pedal" | "";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") ?? "";

  const categoryParam = searchParams.get("category");

  const selectedCategory: CategoryFilter =
    categoryParam === "guitar" ||
    categoryParam === "amp" ||
    categoryParam === "pedal"
      ? categoryParam
      : "all";

  const updateFilter = (key: "search" | "category", value: string) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        return next;
      },
      {
        replace: true,
        preventScrollReset: true,
      },
    );
  };

  // Primera opcion de busqueda
  // const filteredGear = mockGear.filter(
  //   (gear) =>
  //     gear.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     gear.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     gear.category.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  // Segunda opcion: busqueda combinada
  const exploreGear = getExploreGear();
  const filteredGear = exploreGear.filter((gear) => {
    const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);

    const gearText = `
      ${gear.brand}
      ${gear.model}
      ${gear.category}
      ${gear.finish ?? ""}
    `.toLowerCase();

    const matchesSearch = searchTerms.every((term) => gearText.includes(term));

    const matchesCategory =
      selectedCategory === "all" || gear.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const isLoading = false;
  const hasResults = filteredGear.length > 0;

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
            EXPLORE GEAR
          </Typography>

          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
            }}
          >
            Your gear, identified.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 620,
              fontSize: {
                xs: "1rem",
                sm: "1.125rem",
              },
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Explore guitars, amps, and pedals by brand, model, or finish.
            Discover the details behind the gear and build a collection that
            tells your story.
          </Typography>
        </Stack>

        {/* SECTION 2: SEARCH AND FILTERS */}

        <Stack spacing={2} sx={{ maxWidth: 760 }}>
          <TextField
            fullWidth
            placeholder="Search by brand, model, or category"
            variant="outlined"
            value={searchQuery}
            onChange={(event) => updateFilter("search", event.target.value)}
            sx={{
              maxWidth: 640,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                backgroundColor: "background.paper",
              },
            }}
            slotProps={{
              htmlInput: {
                "aria-label": "Search by brand, model, or category",
              },
            }}
          />

          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(_event, newCategory: CategoryFilter | null) => {
              if (newCategory !== null) {
                updateFilter(
                  "category",
                  newCategory === "all" ? "" : newCategory,
                );
              }
            }}
            size="small"
            aria-label="Gear category"
            sx={{
              alignSelf: "flex-start",
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="guitar">Guitars</ToggleButton>
            <ToggleButton value="amp">Amps</ToggleButton>
            <ToggleButton value="pedal">Pedals</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* SECTION 3: GEAR RESULTS */}

        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "baseline",
              flexWrap: "wrap",
            }}
          >
            <Typography component="h2" variant="h5">
              Browse gear
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {filteredGear.length}{" "}
              {filteredGear.length === 1 ? "result" : "results"}
            </Typography>
          </Stack>

          {isLoading ? (
            <Box
              role="status"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                minHeight: 240,
              }}
            >
              <CircularProgress size={32} />

              <Typography variant="body2" color="text.secondary">
                Loading gear...
              </Typography>
            </Box>
          ) : hasResults ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: 3,
              }}
            >
              {filteredGear.map((gear) => (
                <GearCard key={gear.id} gear={gear} />
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 1,
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                No gear found
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Try another search or select a different category.
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Main>
  );
};

export default Explore;
