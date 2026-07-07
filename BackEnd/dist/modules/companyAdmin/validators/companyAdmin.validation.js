"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyAdminStatusSchema = exports.companyIdParamsSchema = exports.companyAdminIdParamsSchema = void 0;
const zod_1 = require("zod");
exports.companyAdminIdParamsSchema = zod_1.z.object({
    companyAdminId: zod_1.z.string().min(1, "Company admin id is required"),
});
exports.companyIdParamsSchema = zod_1.z.object({
    companyId: zod_1.z.string().min(1, "Company id is required"),
});
exports.updateCompanyAdminStatusSchema = zod_1.z.object({
    isActive: zod_1.z.boolean(),
});
