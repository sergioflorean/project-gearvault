export const REVERB_API_BASE_URL =
  import.meta.env.VITE_REVERB_API_URL || "https://api.reverb.com/api";

export const REVERB_LISTINGS_URL = `${REVERB_API_BASE_URL}/listings`;

export const REVERB_HEADERS = {
  Accept: "application/hal+json",
  "Accept-Version": "3.0",
};
