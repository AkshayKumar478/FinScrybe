import { request } from "../../config/api";
import type { CompanyAdminRole } from "../../common/constants/enums";

export interface CompanyAdminUser {
  id: string;
  email: string;
  fullName: string;
  role: CompanyAdminRole;
}

export interface CompanyAdminLoginResponse {
  message: string;
  user: CompanyAdminUser;
}

export const companyAdminApi = {
  login(payload: { email: string; password: string }) {
    return request<CompanyAdminLoginResponse>("/company-admin/login", {
      method: "POST",
      body: payload,
    });
  },

  logout() {
    return request<{ message: string }>("/company-admin/logout", {
      method: "POST",
    });
  },
};
