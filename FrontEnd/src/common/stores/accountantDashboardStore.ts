import { create } from "zustand";

interface AccountantDashboardState {
  accountantActiveTab: string;
  setAccountantActiveTab: (tab: string) => void;
  resetTabs: () => void;
}

export const useAccountantDashboardStore = create<AccountantDashboardState>((set) => ({
  accountantActiveTab: "dashboard",
  setAccountantActiveTab: (tab) => set({ accountantActiveTab: tab }),
  resetTabs: () => set({ accountantActiveTab: "dashboard" })
}));
