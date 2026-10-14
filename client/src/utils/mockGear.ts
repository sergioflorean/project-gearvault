import type { GearPreview } from "../types/gear";

export const mockGear: GearPreview[] = [
  {
    id: "1",
    brand: "Gibson",
    model: "Les Paul Junior",
    category: "guitar",
    year: 2011,
    finish: "TV Yellow",
    availability: "not_for_sale",
  },
  {
    id: "2",
    brand: "Fender",
    model: "American Professional II Stratocaster",
    category: "guitar",
    year: 2023,
    finish: "Olympic White",
    availability: "open_to_trade",
  },
  {
    id: "3",
    brand: "Boss",
    model: "CE-2W Chorus",
    category: "pedal",
    year: 2024,
    finish: "Blue",
    availability: "for_sale",
  },
  {
    id: "4",
    brand: "Marshall",
    model: "JCM800 2203",
    category: "amp",
    year: 1987,
    finish: "Black",
    availability: "not_for_sale",
  },
];