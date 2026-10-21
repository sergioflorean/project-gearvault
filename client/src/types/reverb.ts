export interface ReverbPrice {
  amount: string;
  currency: string;
}

export interface ReverbListing {
  id: number;
  title: string;
  make: string;
  model: string;
  year: string;
  price: ReverbPrice;
  _links?: {
    web?: {
      href?: string;
    };
  };
}

export interface ReverbListingsResponse {
  total: number;
  listings: ReverbListing[];
}
