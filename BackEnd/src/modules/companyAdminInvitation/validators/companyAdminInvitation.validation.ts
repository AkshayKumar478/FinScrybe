import { z } from "zod";

import { CompanyAdminRole } from "../../../common/types";

export const createCompanyAdminInvitationSchema = z.object({
  email: z.string().email("A valid email is required").trim().toLowerCase(),
  role: z.nativeEnum(CompanyAdminRole),
});

export const resendCompanyAdminInvitationParamsSchema = z.object({
  invitationId: z.string().min(1, "Invitation id is required"),
});

export const validateCompanyAdminInvitationQuerySchema = z.object({
  token: z.string().min(1, "Invitation token is required"),
});

export const acceptCompanyAdminInvitationSchema = z.object({
  token: z.string().min(1, "Invitation token is required"),
  fullName: z.string().trim().min(1, "Full name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().trim().min(1, "Phone number is required"),
});
