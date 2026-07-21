import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  Building2,
  CreditCard,
  BarChart3,
  FileText,
  LogOut,
  Bell,
  Settings,
} from "lucide-react";

import adminAvatar from "../../../assets/admin_avatar.png";
import { useAuthStore } from "../../../common/stores/authStore";
import { useAdminDashboardStore } from "../../../common/stores/adminDashboardStore";
import { PendingCompanies } from "../components/PendingCompanies";

const tabLabels: Record<string, string> = {
  dashboard: "Dashboard",
  registrations: "Registrations",
  companies: "Companies",
  subscriptions: "Subscriptions",
  reports: "Platform Reports",
  claims: "Claims",
};

export function SuperAdminDashboard() {
  const navigate = useNavigate();
  const logoutSuperAdmin = useAuthStore((state) => state.logoutSuperAdmin);
  const activeTab = useAdminDashboardStore(
    (state) => state.superAdminActiveTab,
  );
  const setActiveTab = useAdminDashboardStore(
    (state) => state.setSuperAdminActiveTab,
  );

  const handleSelectTab = (tabId: string) => {
    if (tabId === "logout") {
      logoutSuperAdmin();
      navigate("/admins/login");
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans antialiased text-[#111827]">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1e293b] text-white flex flex-col justify-between flex-shrink-0 p-6 border-r border-slate-200">
        <div>
          {/* Logo Header */}
          <div className="mb-8 pl-2">
            <div className="text-xl font-black tracking-tight flex items-center">
              <span>Fin</span>
              <span className="text-[#635BFF]">Scrybe</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
              Super Admin
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "registrations", label: "Registrations", icon: UserCheck },
              { id: "companies", label: "Companies", icon: Building2 },
              { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
              { id: "reports", label: "Platform Reports", icon: BarChart3 },
              { id: "claims", label: "Claims", icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#635BFF] text-white shadow-sm"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom / Logout Action */}
        <div>
          <button
            onClick={() => handleSelectTab("logout")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="text-slate-400 text-xs font-semibold">
            Welcome Back, Alex Chen • 13 June 2026
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-slate-400">
              <button
                onClick={() => alert("System alert status is normal.")}
                className="hover:text-slate-600 transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              </button>
              <button
                onClick={() => alert("Platform configurations dashboard.")}
                className="hover:text-slate-600 transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200"></div>

            {/* Profile Info */}
            <div className="flex items-center gap-3">
              <img
                src={adminAvatar}
                className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                alt="Alex Chen Avatar"
              />
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                  Alex Chen
                </h2>
                <span className="text-[10px] font-bold text-[#635BFF] uppercase tracking-wider block mt-0.5">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content body */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === "registrations" ? (
            <PendingCompanies />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm text-center max-w-md w-full">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                  Welcome to {tabLabels[activeTab] || activeTab}
                </h1>
                <p className="text-slate-500 font-semibold text-sm">
                  This is a placeholder page for the Super Admin{" "}
                  {tabLabels[activeTab] || activeTab} view.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default SuperAdminDashboard;
