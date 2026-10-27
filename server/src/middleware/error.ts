import type { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../config/constants.js";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.path}`,
  });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (
    err instanceof SyntaxError &&
    "status" in err &&
    err.status === 400 &&
    "body" in err
  ) {
    res.status(400).json({
      message: ERROR_MESSAGES.INVALID_JSON_BODY,
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
