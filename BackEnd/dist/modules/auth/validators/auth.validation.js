"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountantLoginSchema = exports.companyAdminLoginSchema = exports.companyRegistrationSchema = exports.superAdminLoginSchema = void 0;
const zod_1 = require("zod");
exports.superAdminLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    password: zod_1.z.string().min(1, "Password is required"),
});
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
exports.companyAdminLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.accountantLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    password: zod_1.z.string().min(1, "Password is required"),
});
