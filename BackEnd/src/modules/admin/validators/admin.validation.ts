import { z } from "zod";

export const superAdminLoginSchema = z.object({
  email: z.string().email("A valid email is required").trim().toLowerCase(),
  password: z.string().min(8, "Password minimum 8 characters is required"),
});


export type SuperAdminLoginInput= z.infer<typeof superAdminLoginSchema>
