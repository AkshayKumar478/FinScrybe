import { z } from "zod";

export const companyAdminIdParamsSchema = z.object({
  companyAdminId: z.string().min(1, "Company admin id is required"),
});

export const companyIdParamsSchema = z.object({
  companyId: z.string().min(1, "Company id is required"),
});

export const updateCompanyAdminStatusSchema = z.object({
  isActive: z.boolean(),
});
