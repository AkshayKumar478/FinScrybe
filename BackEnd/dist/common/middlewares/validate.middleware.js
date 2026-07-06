"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const validateMiddleware = (schemas) => {
    return (req, _res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            next();
        }
        catch (error) {
            if (isZodError(error)) {
                return next(new AppError_1.AppError("Validation failed", 400, {
                    errors: error.issues.map(formatValidationIssue),
                }));
            }
            next(error);
        }
    };
};
exports.validateMiddleware = validateMiddleware;
const isZodError = (error) => {
    return (typeof error === "object" &&
        error !== null &&
        "issues" in error &&
        Array.isArray(error.issues));
};
const formatValidationIssue = (issue) => ({
    field: issue.path.join("."),
    message: issue.message,
});
