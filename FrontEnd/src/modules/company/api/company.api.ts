import { request } from "../../../config/api";
import type { CompanyRegistrationInput, CompanyRegistrationResponse } from "../types/companyRegistration.types";

export const registerCompany = async (payload: CompanyRegistrationInput): Promise<CompanyRegistrationResponse> => {
  return request<CompanyRegistrationResponse>("/auth/company/register", {
    method: "POST",
    body: payload,
  });
};
