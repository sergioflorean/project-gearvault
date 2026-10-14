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
import { mockGear } from "../../utils/mockGear";
import { useState } from "react";

type CategoryFilter = "all" | "guitar" | "amp" | "pedal" | "";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  // const filteredGear = mockGear.filter(
  //   (gear) =>
  //     gear.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     gear.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     gear.category.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  const filteredGear = mockGear.filter((gear) => {
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
      <Stack spacing={3} sx={{ maxWidth: 760 }}>
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.75rem",
              sm: "4rem",
              md: "5rem",
            },
            lineHeight: 1,
          }}
        >
          Your gear, identified.
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 620,
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Catalog your gear, identify your instruments, track market
          information, and manage your collection in one place.
        </Typography>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search by brand, model, or category"
        variant="outlined"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);

          console.log("Event target value:", event.target.value);
          console.log("Search query state:", searchQuery);
        }}
        sx={{
          maxWidth: 640,
        }}
      />
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={(_event, newCategory: CategoryFilter | null) => {
          if (newCategory !== null) {
            setSelectedCategory(newCategory);
          }
        }}
        size="small"
        aria-label="Gear category"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="guitar">Guitars</ToggleButton>
        <ToggleButton value="amp">Amps</ToggleButton>
        <ToggleButton value="pedal">Pedals</ToggleButton>
      </ToggleButtonGroup>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
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
            py: 8,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">No gear found</Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Try a different search or check back later.
          </Typography>
        </Box>
      )}
    </Main>
  );
};

export default Explore;
