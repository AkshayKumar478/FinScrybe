import { request } from "../../config/api";
import { CompanyStatus } from "../../common/constants/enums";

export type CompanyAdminAuthResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePhoto?: string;
    actorType: "COMPANY_ADMIN";
  };
  company?: {
    id: string;
    companyName: string;
    companyEmail: string;
    status: CompanyStatus;
  };
};

export type InvitationResponse = {
  message: string;
  invitation: {
    id: string;
    email: string;
    status: string;
    expiresAt: string;
  };
};

export const authApi = {
  registerCompany(payload: {
    companyName: string;
    industry: string;
    companyEmail: string;
    companyPhone: string;
    adminFullName: string;
    adminEmail: string;
    adminPassword: string;
    adminPhoneNumber: string;
  }) {
    return request("/auth/company/register", {
      method: "POST",
      body: payload,
    });
  },
  loginCompanyAdmin(payload: { email: string; password: string }) {
    return request<CompanyAdminAuthResponse>("/auth/company-admin/login", {
      method: "POST",
      body: payload,
    });
  },
  createAccountantInvitation(
    payload: { email: string; department: string },
    token: string
  ) {
    return request<InvitationResponse>("/invitations", {
      method: "POST",
      body: payload,
      token,
    });
  },
};
