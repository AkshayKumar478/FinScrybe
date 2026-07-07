import { create } from "zustand";

interface AdminDashboardState {
  superAdminActiveTab: string;
  setSuperAdminActiveTab: (tab: string) => void;
  resetTabs: () => void;
}

export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  superAdminActiveTab: "dashboard",
  setSuperAdminActiveTab: (tab) => set({ superAdminActiveTab: tab }),
  resetTabs: () => set({ superAdminActiveTab: "dashboard" })
}));
