import { create } from "zustand";
import { storage } from "../utils/storage";

export const AUTH_STORAGE_KEYS = {
  CLIENT_USER: "clientUser",
  SUPER_ADMIN: "superAdmin",
  COMPANY_ADMIN: "companyAdmin",
} as const;

export interface IClientUser {
  email: string;
  fullName: string;
  role?: string;
  actorType?: string;
}

export interface ISuperAdmin {
  id: string;
  email: string;
  fullName: string;
  actorType?: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

export interface ICompanyAdmin {
  id: string;
  email: string;
  fullName: string;
  role: string;
  actorType: "COMPANY_ADMIN";
}

export interface AuthState {
  clientUser: IClientUser | null;
  superAdmin: ISuperAdmin | null;
  companyAdmin: ICompanyAdmin | null;
  isSuperAdminSessionChecked: boolean;
  setClientUser: (user: IClientUser | null) => void;
  setSuperAdmin: (user: ISuperAdmin | null) => void;
  setCompanyAdmin: (user: ICompanyAdmin | null) => void;
  logoutClient: () => void;
  logoutSuperAdmin: () => void;
  logoutCompanyAdmin: () => void;
  setSuperAdminSessionChecked: (checked: boolean) => void;
}

function parseStoredJson<T>(key: string): T | null {
  const saved = storage.getItem(key);
  if (!saved) {
    return null;
  }
  try {
    return JSON.parse(saved) as T;
  } catch (error) {
    console.warn(`[authStore] Corrupted JSON in storage key "${key}". Clearing stored entry.`, error);
    storage.removeItem(key);
    return null;
  }
}

function setStoredUser<T>(key: string, user: T | null): void {
  if (user) {
    storage.setItem(key, JSON.stringify(user));
  } else {
    storage.removeItem(key);
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  clientUser: parseStoredJson<IClientUser>(AUTH_STORAGE_KEYS.CLIENT_USER),
  superAdmin: parseStoredJson<ISuperAdmin>(AUTH_STORAGE_KEYS.SUPER_ADMIN),
  companyAdmin: parseStoredJson<ICompanyAdmin>(AUTH_STORAGE_KEYS.COMPANY_ADMIN),
  isSuperAdminSessionChecked: false,

  setClientUser: (user) => {
    setStoredUser(AUTH_STORAGE_KEYS.CLIENT_USER, user);
    set({ clientUser: user });
  },

  setSuperAdmin: (user) => {
    setStoredUser(AUTH_STORAGE_KEYS.SUPER_ADMIN, user);
    set({ superAdmin: user });
  },

  setCompanyAdmin: (user) => {
    setStoredUser(AUTH_STORAGE_KEYS.COMPANY_ADMIN, user);
    set({ companyAdmin: user });
  },

  logoutClient: () => {
    storage.removeItem(AUTH_STORAGE_KEYS.CLIENT_USER);
    set({ clientUser: null });
  },

  logoutSuperAdmin: () => {
    storage.removeItem(AUTH_STORAGE_KEYS.SUPER_ADMIN);
    set({ superAdmin: null, isSuperAdminSessionChecked: true });
  },

  logoutCompanyAdmin: () => {
    storage.removeItem(AUTH_STORAGE_KEYS.COMPANY_ADMIN);
    set({ companyAdmin: null });
  },

  setSuperAdminSessionChecked: (checked) => set({ isSuperAdminSessionChecked: checked }),
}));
