import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface PlatformStat {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  detail: string;
  tone: "primary" | "success" | "info" | "warning";
  icon: LucideIcon;
}

export interface CompanyRegistration {
  id: string;
  companyName: string;
  industry: string;
  companyEmail: string;
  registrationDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Reviewing";
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  subscribers: string;
  revenue: string;
  icon: LucideIcon;
}

export interface ClaimRecord {
  id: string;
  claimTitle: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  company: string;
  status: "Open" | "Reviewing" | "Resolved";
  createdDate: string;
}

export interface ChartSeriesPoint {
  label: string;
  value: number;
}

export interface AnalyticsCard {
  id: string;
  title: string;
  type: "line" | "bar" | "donut";
  summary: string;
  data: ChartSeriesPoint[];
}
