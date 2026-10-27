export type GearAvailability = "not_for_sale" | "for_sale" | "open_to_trade";

export interface GearPreview {
  id: string;
  brand: string;
  model: string;
  category: "guitar" | "amp" | "pedal";
  year?: number;
  finish?: string;
  imageUrl?: string;
  availability: GearAvailability;
  identification?: GearIdentification;
}

export interface GearIdentification {
  manufacturingYear?: number;
  country?: string;
  factory?: string;
}

export interface GearMarketData {
  source: "reverb";
  listings: {
    id: number;
    title: string;
    price: number;
    currency: string;
    url?: string;
  }[];
}
