import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/user.js";
import { ERROR_MESSAGES } from "../config/constants.js";

import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_REQUEST_BODY,
    });
    return;
  }
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({
      message: ERROR_MESSAGES.SIGNUP_REQUIRED,
    });
    return;
  }

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    res.status(400).json({
      message: ERROR_MESSAGES.SIGNUP_INVALID_TYPES,
    });
    return;
  }

  if (!email.trim() || !name.trim()) {
    res.status(400).json({
      message: ERROR_MESSAGES.SIGNUP_EMPTY_FIELDS,
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(201).json({
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err: unknown) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      res.status(409).json({
        message: ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED,
      });
      return;
    }

    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        message: ERROR_MESSAGES.INVALID_USER_DATA,
      });
      return;
    }

    throw err;
  }
};

export const login = async (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_REQUEST_BODY,
    });
    return;
  }
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: ERROR_MESSAGES.SIGNIN_REQUIRED,
    });
    return;
  }

  if (typeof email !== "string" || typeof password !== "string") {
    res.status(400).json({
      message: ERROR_MESSAGES.SIGNIN_INVALID_TYPES,
    });
    return;
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401).json({
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
    });
    return;
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.status(200).json({
    token,
    user: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
  });
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({
      message: ERROR_MESSAGES.USER_NOT_FOUND,
    });
    return;
  }

  res.status(200).json({
    user: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
  });
};
