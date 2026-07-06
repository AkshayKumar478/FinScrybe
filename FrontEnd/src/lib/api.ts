export class ApiError extends Error {
  public readonly status: number;
  public readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ??
  "http://localhost:5000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token
        ? {
            Authorization: `Bearer ${options.token}`,
          }
        : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "Request failed",
      response.status,
      data?.details
    );
  }

  return data as T;
}

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
  status: "PENDING" | "APPROVED" | "REJECTED" | "DEACTIVATED";
  createdAt: string;
  updatedAt: string;
};

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
    status: "PENDING" | "APPROVED" | "REJECTED" | "DEACTIVATED";
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

export const api = {
  loginSuperAdmin(payload: { email: string; password: string }) {
    return request<SuperAdminAuthResponse>("/auth/super-admin/login", {
      method: "POST",
      body: payload,
    });
  },
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
