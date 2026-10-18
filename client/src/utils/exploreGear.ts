import type { GearPreview } from "../types/gear";
import { mockGear } from "./mockGear";
import { loadCollection } from "./collectionStorage";

export const getExploreGear = (): GearPreview[] => {
  const collectionGear: GearPreview[] = loadCollection().map((instrument) => ({
    id: instrument.id,
    brand: instrument.brand,
    model: instrument.model,
    category: instrument.category,
    year: instrument.year,
    finish: instrument.finish,
    availability: instrument.availability,
    imageUrl: instrument.photoUrls?.[0],
  }));

  return [...collectionGear, ...mockGear];
};
