import { create } from "zustand";

interface ClientDashboardState {
  clientActiveTab: string;
  setClientActiveTab: (tab: string) => void;
  resetTabs: () => void;
}

export const useClientDashboardStore = create<ClientDashboardState>((set) => ({
  clientActiveTab: "dashboard",
  setClientActiveTab: (tab) => set({ clientActiveTab: tab }),
  resetTabs: () => set({ clientActiveTab: "dashboard" })
}));
