"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = require("../errors/AppError");
const env_1 = require("../../config/env");
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof AppError_1.AppError) {
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
    if (err instanceof mongoose_1.default.Error.ValidationError) {
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
    if (err instanceof jsonwebtoken_1.default.JsonWebTokenError ||
        err instanceof jsonwebtoken_1.default.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            errors: null,
        });
    }
    const payload = {
        success: false,
        message: "Internal server error",
        errors: null,
    };
    if (env_1.env.NODE_ENV !== "production") {
        payload.error = err.message;
        payload.stack = err.stack;
    }
    return res.status(500).json(payload);
};
exports.errorMiddleware = errorMiddleware;
const isZodError = (error) => {
    return (typeof error === "object" &&
        error !== null &&
        "issues" in error &&
        Array.isArray(error.issues));
};
const isDuplicateKeyError = (error) => {
    return (error instanceof mongoose_1.default.mongo.MongoServerError &&
        error.code === 11000);
};
