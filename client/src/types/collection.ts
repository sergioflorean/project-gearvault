import type { GearPreview } from "./gear";

export interface CollectionItem extends GearPreview {
  catalogGearId?: string;
  serialNumber?: string;
  photoUrls?: string[];
  addedAt: string;
}
