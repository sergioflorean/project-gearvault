import type { GearPreview } from "./gear";

export interface CollectionItem extends GearPreview {
  serialNumber?: string;
  addedAt: string;
}
