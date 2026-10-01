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
  LogOut,
  Settings,
  X,
} from "lucide-react";
import type { CompanyAdminNavItemId, NavItemConfig } from "../types/navigation";

const MAIN_NAV_ITEMS: NavItemConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "accountants", label: "Accountants", icon: Users },
  { id: "categories", label: "Categories", icon: Network },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "forecasting", label: "Forecasting", icon: TrendingUp },
  { id: "ai-insights", label: "AI Insights", icon: Sparkles },
  { id: "claims", label: "Claims", icon: FileCheck },
];

const BOTTOM_NAV_ITEMS: NavItemConfig[] = [
  { id: "subscription", label: "Subscription", icon: Tag },
  { id: "settings", label: "Settings", icon: Settings },
];

interface CompanyAdminSidebarProps {
  activeItem: CompanyAdminNavItemId;
  onSelect: (id: CompanyAdminNavItemId) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function CompanyAdminSidebar({
  activeItem,
  onSelect,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}: CompanyAdminSidebarProps) {
  const renderNavList = () => (
    <div className="flex flex-col flex-1 justify-between p-4 overflow-y-auto">
      {/* Top Brand Section */}
      <div>
        <div className="px-3 pt-2 pb-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-black tracking-tight select-none">
              <span className="text-white">Fin</span>
              <span className="text-[#635BFF]">Scrybe</span>
            </div>
            <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
              Enterprise Tier
            </p>
          </div>

          {/* Close button on mobile drawer */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-1" aria-label="Main Navigation">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-[#635BFF] text-white shadow-[0_2px_10px_rgba(99,91,255,0.35)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation Section */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-1">
        {/* Subscription Item */}
        {(() => {
          const subItem = BOTTOM_NAV_ITEMS.find((i) => i.id === "subscription")!;
          const Icon = subItem.icon;
          const isActive = activeItem === subItem.id;
          return (
            <button
              type="button"
              onClick={() => {
                onSelect(subItem.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? "bg-[#635BFF] text-white shadow-[0_2px_10px_rgba(99,91,255,0.35)] font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{subItem.label}</span>
            </button>
          );
        })()}

        {/* Logout Action */}
        <button
          type="button"
          onClick={() => {
            onCloseMobile();
            onLogout();
          }}
          className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left cursor-pointer"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Logout</span>
        </button>

        {/* Settings Item */}
        {(() => {
          const settingsItem = BOTTOM_NAV_ITEMS.find((i) => i.id === "settings")!;
          const Icon = settingsItem.icon;
          const isActive = activeItem === settingsItem.id;
          return (
            <button
              type="button"
              onClick={() => {
                onSelect(settingsItem.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? "bg-[#635BFF] text-white shadow-[0_2px_10px_rgba(99,91,255,0.35)] font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span>{settingsItem.label}</span>
            </button>
          );
        })()}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0B132B] flex-col shrink-0 min-h-screen border-r border-slate-900 select-none">
        {renderNavList()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#0B132B] z-50 flex flex-col shadow-2xl md:hidden transition-transform duration-300 ease-in-out select-none ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile Navigation"
      >
        {renderNavList()}
      </aside>
    </>
  );
}
