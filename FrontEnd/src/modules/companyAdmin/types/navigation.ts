import type { LucideIcon } from "lucide-react";

export type CompanyAdminNavItemId =
  | "dashboard"
  | "accountants"
  | "categories"
  | "transactions"
  | "reports"
  | "forecasting"
  | "ai-insights"
  | "claims"
  | "subscription"
  | "settings";

export interface NavItemConfig {
  id: CompanyAdminNavItemId;
  label: string;
  icon: LucideIcon;
}
