import type { CollectionItem } from "../types/collection";
import { apiRequest } from "./api";

type InstrumentDocument = Omit<CollectionItem, "id"> & {
  _id: string;
  owner: string;
};

type InstrumentsResponse = {
  instruments: InstrumentDocument[];
};

export const getMyInstruments = async (
  token: string,
): Promise<CollectionItem[]> => {
  const data = await apiRequest<InstrumentsResponse>(
    "/api/instruments",
    {},
    token,
  );

  return data.instruments.map(({ _id, ...instrument }) => ({
    ...instrument,
    id: _id,
  }));
};

type NewInstrument = Pick<
  CollectionItem,
  | "brand"
  | "model"
  | "category"
  | "year"
  | "finish"
  | "serialNumber"
  | "imageUrl"
  | "availability"
>;

type CreateInstrumentResponse = {
  instrument: InstrumentDocument;
};

export const createInstrument = async (
  token: string,
  instrument: NewInstrument,
): Promise<CollectionItem> => {
  const data = await apiRequest<CreateInstrumentResponse>(
    "/api/instruments",
    {
      method: "POST",
      body: JSON.stringify(instrument),
    },
    token,
  );

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
  token: string,
  id: string,
): Promise<CollectionItem> => {
  const data = await apiRequest<InstrumentResponse>(
    `/api/instruments/${id}`,
    {},
    token,
  );

  const { _id, ...instrument } = data.instrument;

  return {
    ...instrument,
    id: _id,
  };
};

export const updateInstrument = async (
  token: string,
  id: string,
  updates: Partial<NewInstrument>,
): Promise<CollectionItem> => {
  const data = await apiRequest<InstrumentResponse>(
    `/api/instruments/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    },
    token,
  );

  const { _id, ...instrument } = data.instrument;

  return {
    ...instrument,
    id: _id,
  };
};

export const deleteInstrument = async (
  token: string,
  id: string,
): Promise<void> => {
  await apiRequest<{ message: string }>(
    `/api/instruments/${id}`,
    {
      method: "DELETE",
    },
    token,
  );
};
