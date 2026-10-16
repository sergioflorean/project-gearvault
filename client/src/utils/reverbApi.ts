import { REVERB_LISTINGS_URL, REVERB_HEADERS } from "./reverbConfig";

import type { ReverbListingsResponse } from "../types/reverb";

export const fetchReverbListings = async (
  brand: string,
  model: string,
): Promise<ReverbListingsResponse> => {
  const url = new URL(REVERB_LISTINGS_URL);

  url.searchParams.set("query", `${brand} ${model}`);
  url.searchParams.set("per_page", "10");

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
