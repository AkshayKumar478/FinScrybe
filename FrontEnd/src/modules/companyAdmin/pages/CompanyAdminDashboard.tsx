import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Network,
  ArrowLeftRight,
  FileBarChart,
  TrendingUp,
  Sparkles,
  FileCheck,
  Tag,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { useAuthStore } from "../../../common/stores/authStore";
import { companyAdminApi } from "../api";
import { CompanyAdminSidebar } from "../components/CompanyAdminSidebar";
import { CompanyAdminHeader } from "../components/CompanyAdminHeader";
import type { CompanyAdminNavItemId } from "../types/navigation";

const NAV_ITEM_DETAILS: Record<
  CompanyAdminNavItemId,
  { label: string; icon: LucideIcon; description: string }
> = {
  dashboard: {
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Monitor real-time company finances, transactions, and platform activities.",
  },
  accountants: {
    label: "Accountants",
    icon: Users,
    description: "Manage internal accounting team members, assignments, and permissions.",
  },
  categories: {
    label: "Categories",
    icon: Network,
    description: "Organize ledger charts of accounts, expense categories, and cost centers.",
  },
  transactions: {
    label: "Transactions",
    icon: ArrowLeftRight,
    description: "Review incoming and outgoing company cash flows, invoices, and expenses.",
  },
  reports: {
    label: "Reports",
    icon: FileBarChart,
    description: "Generate and export audited financial statements, P&L, and balance sheets.",
  },
  forecasting: {
    label: "Forecasting",
    icon: TrendingUp,
    description: "Predict future financial trends, burn rates, and quarterly revenues.",
  },
  "ai-insights": {
    label: "AI Insights",
    icon: Sparkles,
    description: "Leverage automated intelligence recommendations and anomaly detections.",
  },
  claims: {
    label: "Claims",
    icon: FileCheck,
    description: "Track and approve employee reimbursement claims, travel, and allowances.",
  },
  subscription: {
    label: "Subscription",
    icon: Tag,
    description: "Manage enterprise plan tiers, licenses, billing cycles, and payment methods.",
  },
  settings: {
    label: "Settings",
    icon: Settings,
    description: "Configure portal security policies, enterprise notifications, and integrations.",
  },
};

export const CompanyAdminDashboard = () => {
  const navigate = useNavigate();
  const companyAdmin = useAuthStore((state) => state.companyAdmin);
  const logoutCompanyAdmin = useAuthStore((state) => state.logoutCompanyAdmin);

  const [activeItem, setActiveItem] =
    useState<CompanyAdminNavItemId>("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await companyAdminApi.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      logoutCompanyAdmin();
      navigate("/login");
    }
  };

  const currentNav = NAV_ITEM_DETAILS[activeItem];
  const CurrentIcon = currentNav.icon;

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex text-slate-900 font-sans antialiased">
      {/* Dark Navy Sidebar */}
      <CompanyAdminSidebar
        activeItem={activeItem}
        onSelect={(id) => setActiveItem(id)}
        onLogout={handleLogout}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <CompanyAdminHeader
          adminName={companyAdmin?.fullName || "Alex Stratton"}
          adminRole={companyAdmin?.role || "Chief Financial Officer"}
          onToggleMobile={() => setIsMobileOpen((prev) => !prev)}
        />

        {/* Centered Welcome Panel */}
        <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.05)] p-8 sm:p-12 text-center">
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#635BFF] flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CurrentIcon size={28} className="stroke-[2.2]" />
            </div>

            {/* Welcome Heading */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome to {currentNav.label}
            </h1>

            {/* Description */}
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
              {currentNav.description}
            </p>

            {/* Session Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                Enterprise Portal &bull;{" "}
                <strong className="text-slate-800">
                  {companyAdmin?.fullName || "Company Administrator"}
                </strong>
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
