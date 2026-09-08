import { request } from "../../config/api";
import { CompanyStatus } from "../../common/constants/enums";

export type SuperAdminAuthResponse = {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePhoto?: string;
    actorType: "ADMIN";
  };
};

export type CurrentSuperAdminResponse = {
  user: SuperAdminAuthResponse["user"];
};

export type CompanyRecord = {
  id: string;
  companyName: string;
  industry: string;
  companyEmail: string;
  companyPhone: string;
  status: CompanyStatus;
  createdAt: string;
  updatedAt: string;
};

export const adminApi = {
  loginSuperAdmin(payload: { email: string; password: string }) {
    return request<SuperAdminAuthResponse>("/admin/login", {
      method: "POST",
      body: payload,
    });
  },

  logoutSuperAdmin() {
    return request<{ message: string }>("/admin/logout", {
      method: "POST",
    });
  },

  getCurrentSuperAdmin() {
    return request<CurrentSuperAdminResponse>("/admin/me");
  },

  listPendingCompanies() {
    return request<CompanyRecord[]>("/companies/pending");
  },

  updateCompanyStatus(companyId: string, status: CompanyStatus) {
    return request<{ message: string }>(`/companies/${companyId}/status`, {
      method: "PATCH",
      body: { status },
    });
  },
};
