
import { z } from "zod";

export const createInvitationSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase(),

  department: z
    .string()
    .trim()
    .min(1, "Department is required"),
});

export const resendInvitationParamsSchema = z.object({
  invitationId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid invitation ID"),
});

export const validateInvitationParamsSchema = z.object({
  invitationId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid invitation ID"),
});

export const validateInvitationQuerySchema = z.object({
  token: z.string().min(1, "Invitation token is required"),
});

export const acceptInvitationSchema = z.object({
  token: z.string().min(1, "Invitation token is required"),
  fullName: z.string().trim().min(1, "Full name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().trim().min(1, "Phone number is required"),
});

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>;
export type ResendInvitationParams = z.infer<typeof resendInvitationParamsSchema>;
export type ValidateInvitationParams = z.infer<typeof validateInvitationParamsSchema>;
export type ValidateInvitationQuery = z.infer<typeof validateInvitationQuerySchema>;
export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;
