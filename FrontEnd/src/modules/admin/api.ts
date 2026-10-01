import { request } from "../../config/api";

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

};
