import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../config/constants.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: ERROR_MESSAGES.AUTH_TOKEN_REQUIRED,
    });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN,
    });
  }
};
