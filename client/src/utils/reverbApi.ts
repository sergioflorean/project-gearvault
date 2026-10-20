import { REVERB_LISTINGS_URL, REVERB_HEADERS } from "./reverbConfig";

import type { ReverbListingsResponse } from "../types/reverb";
import type { GearPreview } from "../types/gear";

const PRODUCT_TYPES: Record<GearPreview["category"], string> = {
  guitar: "electric-guitars",
  amp: "amps",
  pedal: "effects-and-pedals",
};

export const fetchReverbListings = async (
  brand: string,
  model: string,
  category: GearPreview["category"],
): Promise<ReverbListingsResponse> => {
  const url = new URL(REVERB_LISTINGS_URL);

  const query = `${brand} ${model}`.trim().replace(/\s+/g, " ").toLowerCase();

  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "50");
  url.searchParams.set("product_type", PRODUCT_TYPES[category]);

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      headers: REVERB_HEADERS,
    });
  } catch {
    throw new Error("Network error: Could not connect to Reverb.");
  }

  if (!response.ok) {
    throw new Error(`Reverb API error: ${response.status}`);
  }

  const data: ReverbListingsResponse = await response.json();

  return data;
};
