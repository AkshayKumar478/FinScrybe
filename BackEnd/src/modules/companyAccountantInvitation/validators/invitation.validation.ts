import { z } from "zod";

export const createInvitationSchema = z.object({
  email: z.string().email("A valid email is required").trim().toLowerCase(),
  department: z.string().trim().min(1, "Department is required"),
});

export const resendInvitationParamsSchema = z.object({
  invitationId: z.string().min(1, "Invitation id is required"),
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
