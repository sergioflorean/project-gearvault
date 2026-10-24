import type { Request, Response } from "express";
import Instrument from "../models/instrument.js";
import mongoose from "mongoose";

export const getInstruments = async (_req: Request, res: Response) => {
  const instruments = await Instrument.find({
    owner: _req.user?.userId,
  }).sort({ createdAt: -1 });

  res.status(200).json({ instruments });
};

export const createInstrument = async (req: Request, res: Response) => {
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
      message: "Brand, model, and category are required",
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
      message: "Invalid instrument data",
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
        message: "Invalid instrument data",
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
      message: "Invalid instrument ID",
    });
    return;
  }

  const instrument = await Instrument.findOne({
    _id: id,
    owner: req.user?.userId,
  });

  if (!instrument) {
    res.status(404).json({
      message: "Instrument not found",
    });
    return;
  }

  res.status(200).json({ instrument });
};

export const updateInstrument = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: "Invalid instrument ID",
    });
    return;
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      message: "Invalid request body",
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

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    res.status(400).json({
      message: "No valid fields to update",
    });
    return;
  }

  try {
    const instrument = await Instrument.findOneAndUpdate(
      {
        _id: id,
        owner: req.user?.userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!instrument) {
      res.status(404).json({
        message: "Instrument not found",
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
        message: "Invalid instrument data",
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
      message: "Invalid instrument ID",
    });
    return;
  }

  const instrument = await Instrument.findOne({
    _id: id,
    owner: req.user?.userId,
  });

  if (!instrument) {
    res.status(404).json({
      message: "Instrument not found",
    });
    return;
  }

  await instrument.deleteOne();

  res.status(200).json({
    message: "Instrument deleted successfully",
  });
};
