"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const AppError_1 = require("./AppError");
class ConflictError extends AppError_1.AppError {
    constructor(message = "Resource conflict") {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
