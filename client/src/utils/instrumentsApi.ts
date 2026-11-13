import type { CollectionItem } from "../types/collection";
import { apiRequest } from "./api";
import type { GearPreview } from "../types/gear";

type InstrumentDocument = Omit<CollectionItem, "id"> & {
  _id: string;
  owner: string;
};

type InstrumentsResponse = {
  instruments: InstrumentDocument[];
};

export const getMyInstruments = async (): Promise<CollectionItem[]> => {
  const data = await apiRequest<InstrumentsResponse>("/api/instruments", {});

  return data.instruments.map(({ _id, ...instrument }) => ({
    ...instrument,
    id: _id,
  }));
};

type NewInstrument = Pick<
  CollectionItem,
  "brand" | "model" | "category" | "availability"
> & {
  [Field in "year" | "finish" | "serialNumber" | "imageUrl"]?:
    | CollectionItem[Field]
    | null;
};

type CreateInstrumentResponse = {
  instrument: InstrumentDocument;
};

export const createInstrument = async (
  instrument: NewInstrument,
): Promise<CollectionItem> => {
  const data = await apiRequest<CreateInstrumentResponse>("/api/instruments", {
    method: "POST",
    // Creation keeps omitting empty optional fields; null is for PATCH removal.
    body: JSON.stringify({
      ...instrument,
      year: instrument.year ?? undefined,
      finish: instrument.finish ?? undefined,
      serialNumber: instrument.serialNumber ?? undefined,
      imageUrl: instrument.imageUrl ?? undefined,
    }),
  });

  const { _id, ...savedInstrument } = data.instrument;

  return {
    ...savedInstrument,
    id: _id,
  };
};

type InstrumentResponse = {
  instrument: InstrumentDocument;
};

export const getInstrumentById = async (
  id: string,
): Promise<CollectionItem> => {
  const data = await apiRequest<InstrumentResponse>(
    `/api/instruments/${id}`,
    {},
  );

  const { _id, ...instrument } = data.instrument;

  return {
    ...instrument,
    id: _id,
  };
};

export const updateInstrument = async (
  id: string,
  updates: Partial<NewInstrument>,
): Promise<CollectionItem> => {
  const data = await apiRequest<InstrumentResponse>(`/api/instruments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });

  const { _id, ...instrument } = data.instrument;

  return {
    ...instrument,
    id: _id,
  };
};

export const deleteInstrument = async (id: string): Promise<void> => {
  await apiRequest<{ message: string }>(`/api/instruments/${id}`, {
    method: "DELETE",
  });
};

type PublicInstrumentDocument = Omit<GearPreview, "id"> & {
  _id: string;
};

export const getPublicInstruments = async (): Promise<GearPreview[]> => {
  const data = await apiRequest<{
    instruments: PublicInstrumentDocument[];
  }>("/api/explore");

  return data.instruments.map(({ _id, ...instrument }) => ({
    ...instrument,
    id: _id,
  }));
};

export const getPublicInstrumentById = async (
  id: string,
): Promise<GearPreview> => {
  const data = await apiRequest<{
    instrument: PublicInstrumentDocument;
  }>(`/api/explore/${id}`);

  const { _id, ...instrument } = data.instrument;

  return {
    ...instrument,
    id: _id,
  };
};
