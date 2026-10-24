import type { GearMarketData } from "../types/gear";

type MarketListing = GearMarketData["listings"][number];

export interface MarketStats {
  median: number;
  low: number;
  high: number;
  currency: string;
  sampleSize: number;
}

const getPercentile = (prices: number[], percentile: number): number => {
  const position = (prices.length - 1) * percentile;
  const lowerIndex = Math.floor(position);
  const upperIndex = Math.ceil(position);

  const lowerPrice = prices[lowerIndex]!;
  const upperPrice = prices[upperIndex]!;

  return lowerPrice + (upperPrice - lowerPrice) * (position - lowerIndex);
};

export const calculateMarketStats = (
  listings: MarketListing[],
): MarketStats | null => {
  const pricesByCurrency = new Map<string, number[]>();

  for (const listing of listings) {
    const currency = listing.currency.trim().toUpperCase();

    if (
      !Number.isFinite(listing.price) ||
      listing.price <= 0 ||
      !/^[A-Z]{3}$/.test(currency)
    ) {
      continue;
    }

    const prices = pricesByCurrency.get(currency) ?? [];
    prices.push(listing.price);
    pricesByCurrency.set(currency, prices);
  }

  const largestGroup = [...pricesByCurrency.entries()].sort(
    (a, b) => b[1].length - a[1].length,
  )[0];

  if (!largestGroup || largestGroup[1].length < 3) {
    return null;
  }

  const [currency, prices] = largestGroup;

  prices.sort((a, b) => a - b);

  return {
    median: getPercentile(prices, 0.5),
    low: getPercentile(prices, 0.25),
    high: getPercentile(prices, 0.75),
    currency,
    sampleSize: prices.length,
  };
};
