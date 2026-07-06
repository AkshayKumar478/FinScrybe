import { create } from "zustand";

interface ClientUser {
  email: string;
  fullName: string;
}

interface AuthState {
  clientUser: ClientUser | null;
  superAdminToken: string | null;
  setClientUser: (user: ClientUser | null) => void;
  setSuperAdminToken: (token: string | null) => void;
  logoutClient: () => void;
  logoutSuperAdmin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  clientUser: (() => {
    const saved = localStorage.getItem("clientUser");
    return saved ? JSON.parse(saved) : null;
  })(),
  superAdminToken: localStorage.getItem("superAdminToken"),
  
  setClientUser: (user) => {
    if (user) {
      localStorage.setItem("clientUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("clientUser");
    }
    set({ clientUser: user });
  },
  
  setSuperAdminToken: (token) => {
    if (token) {
      localStorage.setItem("superAdminToken", token);
    } else {
      localStorage.removeItem("superAdminToken");
    }
    set({ superAdminToken: token });
  },
  
  logoutClient: () => {
    localStorage.removeItem("clientUser");
    set({ clientUser: null });
  },
  
  logoutSuperAdmin: () => {
    localStorage.removeItem("superAdminToken");
    set({ superAdminToken: null });
  }
}));
