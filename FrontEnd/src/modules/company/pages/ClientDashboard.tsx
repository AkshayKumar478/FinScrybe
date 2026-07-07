import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  History, 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  FileText, 
  Tag, 
  LogOut, 
  Settings, 
  Bell, 
  HelpCircle
} from "lucide-react";

import adminAvatar from "../../../assets/admin_avatar.png";
import { useAuthStore } from "../../../common/stores/authStore";
import { useClientDashboardStore } from "../../../common/stores/clientDashboardStore";
import { AccountantsTab } from "../components/AccountantsTab";

const tabLabels: Record<string, string> = {
  dashboard: "Dashboard",
  accountants: "Accountants",
  categories: "Categories",
  transactions: "Transactions",
  reports: "Reports",
  forecasting: "Forecasting",
  "ai-insights": "AI Insights",
  claims: "Claims",
  subscription: "Subscription",
  settings: "Settings"
};

export function ClientDashboard() {
  const navigate = useNavigate();
  
  const clientUser = useAuthStore((state) => state.clientUser);
  const logoutClient = useAuthStore((state) => state.logoutClient);
  
  const activeTab = useClientDashboardStore((state) => state.clientActiveTab);
  const setActiveTab = useClientDashboardStore((state) => state.setClientActiveTab);

  const handleSelectTab = (tabId: string) => {
    if (tabId === "logout") {
      logoutClient();
      navigate("/");
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans antialiased text-[#111827]">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0b1524] text-white flex flex-col justify-between flex-shrink-0 p-6">
        <div>
          {/* Logo & Subtitle */}
          <div className="mb-8 pl-2">
            <div className="text-xl font-black tracking-tight flex items-center">
              <span>Fin</span>
              <span className="text-[#635BFF]">Scrybe</span>
            </div>
            <div className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
              Enterprise Tier
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "accountants", label: "Accountants", icon: Users },
              { id: "categories", label: "Categories", icon: Layers },
              { id: "transactions", label: "Transactions", icon: History },
              { id: "reports", label: "Reports", icon: BarChart3 },
              { id: "forecasting", label: "Forecasting", icon: TrendingUp },
              { id: "ai-insights", label: "AI Insights", icon: Sparkles },
              { id: "claims", label: "Claims", icon: FileText }
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

        {/* Bottom Navigation Links */}
        <div className="space-y-2">
          {/* Divider */}
          <div className="border-t border-slate-800 my-4"></div>

          <ul className="space-y-1">
            {[
              { id: "subscription", label: "Subscription", icon: Tag },
              { id: "logout", label: "Logout", icon: LogOut },
              { id: "settings", label: "Settings", icon: Settings }
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
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-end items-center gap-6">
          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-slate-600 transition-colors">
              <Bell size={20} />
            </button>
            <button className="hover:text-slate-600 transition-colors">
              <HelpCircle size={20} />
            </button>
          </div>
          
          {/* Divider */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* User profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                {clientUser?.fullName || "Alex Stratton"}
              </h2>
              <span className="text-[10px] font-bold text-slate-400">Chief Financial Officer</span>
            </div>
            <img 
              src={adminAvatar} 
              className="w-10 h-10 rounded-full border border-slate-200 object-cover" 
              alt="Alex Stratton Avatar" 
            />
          </div>
        </header>

        {/* Content body */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === "accountants" ? (
            <AccountantsTab />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm text-center max-w-md w-full">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                  Welcome to {tabLabels[activeTab] || activeTab}
                </h1>
                <p className="text-slate-500 font-semibold text-sm">
                  This is a placeholder page for the Client {tabLabels[activeTab] || activeTab} view.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
