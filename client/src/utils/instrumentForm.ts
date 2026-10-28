import type { CollectionItem } from "../types/collection";

export const parseInstrumentForm = (formData: FormData) => {
  const getText = (field: string) => String(formData.get(field) ?? "").trim();

  const year = getText("year");

  return {
    brand: getText("brand"),
    model: getText("model"),
    category: getText("category") as CollectionItem["category"],
    // Keep explicit empty values in PATCH requests so optional fields can be removed.
    year: year ? Number(year) : null,
    finish: getText("finish") || null,
    serialNumber: getText("serialNumber") || null,
    imageUrl: getText("imageUrl") || null,
    availability: getText("availability") as CollectionItem["availability"],
  };
};
