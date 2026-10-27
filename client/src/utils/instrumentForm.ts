import type { CollectionItem } from "../types/collection";

export const parseInstrumentForm = (formData: FormData) => {
  const getText = (field: string) => String(formData.get(field) ?? "").trim();

  const year = getText("year");

  return {
    brand: getText("brand"),
    model: getText("model"),
    category: getText("category") as CollectionItem["category"],
    year: year ? Number(year) : undefined,
    finish: getText("finish") || undefined,
    serialNumber: getText("serialNumber") || undefined,
    imageUrl: getText("imageUrl") || undefined,
    availability: getText("availability") as CollectionItem["availability"],
  };
};
