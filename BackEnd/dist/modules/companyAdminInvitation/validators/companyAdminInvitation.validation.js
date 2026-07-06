"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptCompanyAdminInvitationSchema = exports.validateCompanyAdminInvitationQuerySchema = exports.resendCompanyAdminInvitationParamsSchema = exports.createCompanyAdminInvitationSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../common/types");
exports.createCompanyAdminInvitationSchema = zod_1.z.object({
    email: zod_1.z.string().email("A valid email is required").trim().toLowerCase(),
    role: zod_1.z.nativeEnum(types_1.CompanyAdminRole),
});
exports.resendCompanyAdminInvitationParamsSchema = zod_1.z.object({
    invitationId: zod_1.z.string().min(1, "Invitation id is required"),
});
exports.validateCompanyAdminInvitationQuerySchema = zod_1.z.object({
    token: zod_1.z.string().min(1, "Invitation token is required"),
});
exports.acceptCompanyAdminInvitationSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, "Invitation token is required"),
    fullName: zod_1.z.string().trim().min(1, "Full name is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: zod_1.z.string().trim().min(1, "Phone number is required"),
});
