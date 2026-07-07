import { create } from "zustand";
import { storage } from "../utils/storage";

interface ClientUser {
  email: string;
  fullName: string;
  token?: string;
  role?: string;
  actorType?: string;
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
    const saved = storage.getItem("clientUser");
    return saved ? JSON.parse(saved) : null;
  })(),
  superAdminToken: storage.getItem("superAdminToken"),
  
  setClientUser: (user) => {
    if (user) {
      storage.setItem("clientUser", JSON.stringify(user));
    } else {
      storage.removeItem("clientUser");
    }
    set({ clientUser: user });
  },
  
  setSuperAdminToken: (token) => {
    if (token) {
      storage.setItem("superAdminToken", token);
    } else {
      storage.removeItem("superAdminToken");
    }
    set({ superAdminToken: token });
  },
  
  logoutClient: () => {
    storage.removeItem("clientUser");
    set({ clientUser: null });
  },
  
  logoutSuperAdmin: () => {
    storage.removeItem("superAdminToken");
    set({ superAdminToken: null });
  }
}));
