import type { GearMarketData } from "../types/gear";
import type { ReverbListingsResponse } from "../types/reverb";

export const mapReverbListingsToMarketData = (
  response: ReverbListingsResponse,
  brand: string,
  model: string,
): GearMarketData => {
  const listings = (Array.isArray(response.listings) ? response.listings : [])
    .filter((listing) => {
      if (
        !listing ||
        typeof listing.title !== "string" ||
        typeof listing.make !== "string" ||
        !listing.price ||
        typeof listing.price.amount !== "string" ||
        typeof listing.price.currency !== "string"
      ) {
        return false;
      }

      const price = Number(listing.price.amount);

      const sameBrand =
        listing.make.trim().toLowerCase() === brand.trim().toLowerCase();

      const sameModel = listing.title
        .toLowerCase()
        .includes(model.trim().toLowerCase());

      return (
        sameBrand &&
        sameModel &&
        Number.isFinite(price) &&
        price > 0 &&
        listing.price.currency.trim().length > 0
      );
    })
    .map((listing) => ({
      id: listing.id,
      title: listing.title,
      price: Number(listing.price.amount),
      currency: listing.price.currency,
      url: listing._links?.web?.href,
    }));

  return {
    source: "reverb",
    listings,
  };
};
