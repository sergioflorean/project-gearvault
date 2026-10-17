import type { CollectionItem } from "../types/collection";

const COLLECTION_STORAGE_KEY = "gearvault.collection.v1";

export const loadCollection = (): CollectionItem[] => {
  try {
    const stored = localStorage.getItem(COLLECTION_STORAGE_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as CollectionItem[]) : [];
  } catch {
    return [];
  }
};

export const saveCollection = (items: CollectionItem[]): void => {
  localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(items));
};
