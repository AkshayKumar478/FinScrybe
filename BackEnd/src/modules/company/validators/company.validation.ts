import { z } from "zod";

import { CompanyStatus } from "../../../common/types";

export const companyIdParamsSchema = z.object({
  companyId: z.string().min(1, "Company id is required"),
});

export const updateCompanyStatusSchema = z.object({
  status: z.nativeEnum(CompanyStatus),
});
