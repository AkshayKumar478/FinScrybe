"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../common/types");
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    actorType: zod_1.z.nativeEnum(types_1.ActorType),
});
exports.resetPasswordSchema = zod_1.z
    .object({
    token: zod_1.z.string().min(1, "Reset token is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: zod_1.z
        .string()
        .min(6, "Confirm password must be at least 6 characters"),
})
    .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
