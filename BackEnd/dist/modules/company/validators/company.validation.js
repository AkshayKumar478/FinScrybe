"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyStatusSchema = exports.companyIdParamsSchema = exports.companyRegistrationSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../common/types");
exports.companyRegistrationSchema = zod_1.z.object({
    companyName: zod_1.z.string().trim().min(1, "Company name is required"),
    industry: zod_1.z.string().trim().min(1, "Industry is required"),
    companyEmail: zod_1.z
        .string()
        .email("A valid company email is required")
        .trim()
        .toLowerCase(),
    companyPhone: zod_1.z.string().trim().min(1, "Company phone is required"),
    adminFullName: zod_1.z
        .string()
        .trim()
        .min(1, "Admin full name is required"),
    adminEmail: zod_1.z
        .string()
        .email("A valid admin email is required")
        .trim()
        .toLowerCase(),
    adminPassword: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    adminPhoneNumber: zod_1.z
        .string()
        .trim()
        .min(1, "Admin phone number is required"),
});
exports.companyIdParamsSchema = zod_1.z.object({
    companyId: zod_1.z.string().min(1, "Company id is required"),
});
exports.updateCompanyStatusSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(types_1.CompanyStatus),
});
