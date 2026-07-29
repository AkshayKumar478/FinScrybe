import { create } from "zustand";
import { storage } from "../utils/storage";

interface IClientUser {
  email: string;
  fullName: string;
  role?: string;
  actorType?: string;
}
interface ISuperAdmin {
  id: string;
  email: string;
  fullName: string;
  actorType?: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

interface AuthState {
  clientUser: IClientUser | null;
  superAdmin: ISuperAdmin | null;
  setClientUser: (user: IClientUser | null) => void;
  setSuperAdmin: (user: ISuperAdmin | null) => void;
  logoutClient: () => void;
  logoutSuperAdmin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  clientUser: (() => {
    const saved = storage.getItem("clientUser");
    return saved ? JSON.parse(saved) : null;
  })(),
  superAdmin: (() => {
    const saved = storage.getItem("superAdmin");
    return saved ? JSON.parse(saved) : null;
  })(),

  setClientUser: (user) => {
    if (user) {
      storage.setItem("clientUser", JSON.stringify(user));
    } else {
      storage.removeItem("clientUser");
    }
    set({ clientUser: user });
  },

  setSuperAdmin: (user) => {
    if (user) {
      storage.setItem("superAdmin", JSON.stringify(user));
    } else {
      storage.removeItem("superAdmin");
    }
    set({ superAdmin: user });
  },

  logoutClient: () => {
    storage.removeItem("clientUser");
    set({ clientUser: null });
  },

  logoutSuperAdmin: () => {
    storage.removeItem("superAdmin");
    set({ superAdmin: null });
  },
}));
