import { request } from "../../config/api";
import { CompanyStatus } from "../../common/constants/enums";

export type SuperAdminAuthResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePhoto?: string;
    actorType: "ADMIN";
  };
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
    return request<SuperAdminAuthResponse>("/auth/super-admin/login", {
      method: "POST",
      body: payload,
    });
  },
  getPendingCompanies(token: string) {
    return request<CompanyRecord[]>("/companies/pending", {
      token,
    });
  },
  updateCompanyStatus(
    companyId: string,
    status: CompanyRecord["status"],
    token: string
  ) {
    return request<CompanyRecord>(`/companies/${companyId}/status`, {
      method: "PATCH",
      body: { status },
      token,
    });
  },
};
