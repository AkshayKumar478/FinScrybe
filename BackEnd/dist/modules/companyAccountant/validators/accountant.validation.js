"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccountantStatusSchema = exports.companyIdParamsSchema = exports.accountantIdParamsSchema = void 0;
const zod_1 = require("zod");
exports.accountantIdParamsSchema = zod_1.z.object({
    accountantId: zod_1.z.string().min(1, "Accountant id is required"),
});
exports.companyIdParamsSchema = zod_1.z.object({
    companyId: zod_1.z.string().min(1, "Company id is required"),
});
exports.updateAccountantStatusSchema = zod_1.z.object({
    isActive: zod_1.z.boolean(),
});
