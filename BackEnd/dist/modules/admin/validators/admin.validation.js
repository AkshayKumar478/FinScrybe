"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminLoginSchema = void 0;
const zod_1 = require("zod");
exports.superAdminLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    password: zod_1.z.string().min(8, "Password minimum 8 characters is required"),
});
