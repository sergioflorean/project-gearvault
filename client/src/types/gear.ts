export type GearAvailability =
  | "not_for_sale"
  | "for_sale"
  | "open_to_trade";

export interface GearPreview {
  id: string;
  brand: string;
  model: string;
  category: "guitar" | "amp" | "pedal";
  year?: number;
  finish?: string;
  availability: GearAvailability;
}