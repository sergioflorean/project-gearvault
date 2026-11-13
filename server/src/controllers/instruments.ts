import type { Request, Response } from "express";
import Instrument from "../models/instrument.js";
import mongoose from "mongoose";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../config/constants.js";

export const getInstruments = async (_req: Request, res: Response) => {
  const instruments = await Instrument.find({
    owner: _req.user?.userId,
  }).sort({ createdAt: -1 });

  res.status(200).json({ instruments });
};

export const createInstrument = async (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_REQUEST_BODY,
    });
    return;
  }
  const {
    brand,
    model,
    category,
    year,
    finish,
    serialNumber,
    imageUrl,
    photoUrls,
    availability,
  } = req.body;

  if (!brand || !model || !category) {
    res.status(400).json({
      message: ERROR_MESSAGES.INSTRUMENT_REQUIRED,
    });
    return;
  }

  if (
    typeof brand !== "string" ||
    typeof model !== "string" ||
    typeof category !== "string" ||
    !brand.trim() ||
    !model.trim() ||
    (category !== "guitar" && category !== "amp" && category !== "pedal")
  ) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_INSTRUMENT_DATA,
    });
    return;
  }

  try {
    const instrument = await Instrument.create({
      brand,
      model,
      category,
      year,
      finish,
      serialNumber,
      imageUrl,
      photoUrls,
      availability,
      owner: req.user?.userId,
    });

    res.status(201).json({
      instrument,
    });
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        message: ERROR_MESSAGES.INVALID_INSTRUMENT_DATA,
      });
      return;
    }

    throw err;
  }
};

export const getInstrumentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_INSTRUMENT_ID,
    });
    return;
  }

  const instrument = await Instrument.findOne({
    _id: id,
    owner: req.user?.userId,
  });

  if (!instrument) {
    res.status(404).json({
      message: ERROR_MESSAGES.INSTRUMENT_NOT_FOUND,
    });
    return;
  }

  res.status(200).json({ instrument });
};

export const updateInstrument = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_INSTRUMENT_ID,
    });
    return;
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_REQUEST_BODY,
    });
    return;
  }

  const allowedFields = [
    "brand",
    "model",
    "category",
    "year",
    "finish",
    "serialNumber",
    "imageUrl",
    "photoUrls",
    "availability",
  ];

  const updates: Record<string, unknown> = {};
  const unsetFields: Record<string, 1> = {};
  const clearableFields = ["year", "finish", "serialNumber", "imageUrl"];

  for (const field of allowedFields) {
    const value: unknown = req.body[field];

    if (value === null && clearableFields.includes(field)) {
      unsetFields[field] = 1;
    } else if (value !== undefined) {
      updates[field] = value;
    }
  }

  if (Object.keys(updates).length === 0 && Object.keys(unsetFields).length === 0) {
    res.status(400).json({
      message: ERROR_MESSAGES.NO_VALID_FIELDS,
    });
    return;
  }

  try {
    const instrument = await Instrument.findOneAndUpdate(
      {
        _id: id,
        owner: req.user?.userId,
      },
      {
        ...(Object.keys(updates).length > 0 && { $set: updates }),
        ...(Object.keys(unsetFields).length > 0 && { $unset: unsetFields }),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!instrument) {
      res.status(404).json({
        message: ERROR_MESSAGES.INSTRUMENT_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({ instrument });
  } catch (err: unknown) {
    if (
      err instanceof mongoose.Error.ValidationError ||
      err instanceof mongoose.Error.CastError
    ) {
      res.status(400).json({
        message: ERROR_MESSAGES.INVALID_INSTRUMENT_DATA,
      });
      return;
    }

    throw err;
  }
};

export const deleteInstrument = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_INSTRUMENT_ID,
    });
    return;
  }

  const instrument = await Instrument.findById(id);

  if (!instrument) {
    res.status(404).json({
      message: ERROR_MESSAGES.INSTRUMENT_NOT_FOUND,
    });
    return;
  }

  if (String(instrument.owner) !== req.user?.userId) {
    res.status(403).json({
      message: ERROR_MESSAGES.INSTRUMENT_DELETE_FORBIDDEN,
    });
    return;
  }

  await instrument.deleteOne();

  res.status(200).json({
    message: SUCCESS_MESSAGES.INSTRUMENT_DELETED,
  });
};

const PUBLIC_INSTRUMENT_FIELDS =
  "brand model category year finish imageUrl availability addedAt owner";

export const getPublicInstruments = async (_req: Request, res: Response) => {
  const instruments = await Instrument.find()
    .select(PUBLIC_INSTRUMENT_FIELDS)
    .populate<{ owner: { name: string } | null }>("owner", "name -_id")
    .sort({ createdAt: -1 });

  res.status(200).json({
    instruments: instruments.map((item) => ({
      _id: item._id,
      brand: item.brand,
      model: item.model,
      category: item.category,
      year: item.year,
      finish: item.finish,
      imageUrl: item.imageUrl,
      availability: item.availability,
      addedAt: item.addedAt,
      ownerName: item.owner?.name ?? "Unknown user",
    })),
  });
};

export const getPublicInstrumentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_INSTRUMENT_ID,
    });
    return;
  }

  const item = await Instrument.findById(id)
    .select(PUBLIC_INSTRUMENT_FIELDS)
    .populate<{ owner: { name: string } | null }>("owner", "name -_id");

  if (!item) {
    res.status(404).json({
      message: ERROR_MESSAGES.INSTRUMENT_NOT_FOUND,
    });
    return;
  }

  res.status(200).json({
    instrument: {
      _id: item._id,
      brand: item.brand,
      model: item.model,
      category: item.category,
      year: item.year,
      finish: item.finish,
      imageUrl: item.imageUrl,
      availability: item.availability,
      addedAt: item.addedAt,
      ownerName: item.owner?.name ?? "Unknown user",
    },
  });
};
