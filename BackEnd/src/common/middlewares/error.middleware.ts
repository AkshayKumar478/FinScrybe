import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {HttpStatus} from '../constants/httpstatus'
import {ValidationMessage,DatabaseMessage, JwtMessage, GeneralMessage} from '../constants/messages'


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
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: ValidationMessage,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: DatabaseMessage.VALIDATION_FAILED,
      errors: Object.values(err.errors).map((issue) => ({
        field: issue.path,
        message: issue.message,
      })),
    });
  }

  if (isDuplicateKeyError(err)) {
    return res.status(409).json({
      success: false,
      message: DatabaseMessage.DUPLICATE_VALUE,
      errors: Object.keys(err.keyValue ?? {}).map((field) => ({
        field,
        message: `${field} ${DatabaseMessage.FIELD_ALREADY_EXISTS}`,
      })),
    });
  }

  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message:JwtMessage.INVALID_OR_EXPIRED_TOKEN,
      errors: null,
    });
  }

  const payload: Record<string, unknown> = {
    success: false,
    message: GeneralMessage.INTERNAL_SERVER_ERROR,
    errors: null,
  };

  if (env.NODE_ENV !== "production") {
    payload.error = err.message;
    payload.stack = err.stack;
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(payload);
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
  keyValue?: Record<string,string>;
} => {
  return (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === HttpStatus.MONGOOSE_DUPLICATE_KEY_ERROR
  );
};
