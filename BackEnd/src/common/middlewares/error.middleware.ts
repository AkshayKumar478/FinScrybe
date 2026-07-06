import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { AppError } from "../errors/AppError";
import { env } from "../../config/env";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.details ?? null,
    });
  }

  if (isZodError(err)) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: Object.values(err.errors).map((issue) => ({
        field: issue.path,
        message: issue.message,
      })),
    });
  }

  if (isDuplicateKeyError(err)) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value violates a unique constraint",
      errors: Object.keys(err.keyValue ?? {}).map((field) => ({
        field,
        message: `${field} already exists`,
      })),
    });
  }

  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      errors: null,
    });
  }

  const payload: Record<string, unknown> = {
    success: false,
    message: "Internal server error",
    errors: null,
  };

  if (env.NODE_ENV !== "production") {
    payload.error = err.message;
    payload.stack = err.stack;
  }

  return res.status(500).json(payload);
};

const isZodError = (
  error: unknown
): error is { issues: Array<{ path: (string | number)[]; message: string }> } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as { issues?: unknown }).issues)
  );
};

const isDuplicateKeyError = (
  error: unknown
): error is mongoose.mongo.MongoServerError & {
  keyValue?: Record<string, unknown>;
} => {
  return (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === 11000
  );
};
