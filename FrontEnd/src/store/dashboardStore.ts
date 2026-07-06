import { create } from "zustand";

interface DashboardState {
  clientActiveTab: string;
  superAdminActiveTab: string;
  setClientActiveTab: (tab: string) => void;
  setSuperAdminActiveTab: (tab: string) => void;
  resetTabs: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  clientActiveTab: "dashboard",
  superAdminActiveTab: "dashboard",
  
  setClientActiveTab: (tab) => set({ clientActiveTab: tab }),
  setSuperAdminActiveTab: (tab) => set({ superAdminActiveTab: tab }),
  resetTabs: () => set({ clientActiveTab: "dashboard", superAdminActiveTab: "dashboard" })
}));
