import { NextFunction, Request, Response } from "express";
import { ZodIssue, ZodTypeAny } from "zod";

import { AppError } from "../errors/AppError";
import {HttpStatus} from '../constants/httpstatus'

type ValidationSchemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validateMiddleware = (
  schemas: ValidationSchemas
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Request["params"];
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as Request["query"];
      }

      next();
    } catch (error) {
      if (isZodError(error)) {
        return next(
          new AppError("Validation failed", HttpStatus.BAD_REQUEST, {
            errors: error.issues.map(formatValidationIssue),
          })
        );
      }

      next(error);
    }
  };
};

const isZodError = (
  error: unknown
): error is { issues: ZodIssue[] } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as { issues?: unknown }).issues)
  );
};

const formatValidationIssue = (issue: ZodIssue) => ({
  field: issue.path.join("."),
  message: issue.message,
});
