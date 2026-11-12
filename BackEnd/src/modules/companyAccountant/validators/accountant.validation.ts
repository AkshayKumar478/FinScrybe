import { z } from "zod";

export const accountantIdParamsSchema = z.object({
  accountantId: z.string().min(1, "Accountant id is required"),
});

export const companyIdParamsSchema = z.object({
  companyId: z.string().min(1, "Company id is required"),
});

export const updateAccountantStatusSchema = z.object({
  isActive: z.boolean(),
});
export const acceptInvitationSchema = z.object({
  invitationId: z.string().min(1),
  token: z.string().min(1),
  fullName: z.string().trim().min(2),
  password: z.string().min(8),
  phoneNumber: z.string().trim().min(10),
});

export const accountantLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;
export type AccountantLoginInput = z.infer<typeof accountantLoginSchema>;