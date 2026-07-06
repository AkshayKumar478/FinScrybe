"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInvitationSchema = exports.validateInvitationQuerySchema = exports.resendInvitationParamsSchema = exports.createInvitationSchema = void 0;
const zod_1 = require("zod");
exports.createInvitationSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    department: zod_1.z.string().trim().min(1, "Department is required"),
});
exports.resendInvitationParamsSchema = zod_1.z.object({
    invitationId: zod_1.z.string().min(1, "Invitation id is required"),
});
exports.validateInvitationQuerySchema = zod_1.z.object({
    token: zod_1.z.string().min(1, "Invitation token is required"),
});
exports.acceptInvitationSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, "Invitation token is required"),
    fullName: zod_1.z.string().trim().min(1, "Full name is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: zod_1.z.string().trim().min(1, "Phone number is required"),
});
