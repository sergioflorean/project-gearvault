import type { GearPreview, GearAvailability } from "./gear";

export interface CollectionItem {
  id: string;
  catalogGearId?: string;
  brand: string;
  model: string;
  category: GearPreview["category"];
  year?: number;
  finish?: string;
  serialNumber?: string;
  availability: GearAvailability;
  photoUrls?: string[];
  addedAt: string;
}
