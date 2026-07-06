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
