import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Landmark, 
  History, 
  Receipt, 
  Layers, 
  ShieldAlert, 
  Settings, 
  LogOut, 
  Bell
} from "lucide-react";

import adminAvatar from "../../../assets/admin_avatar.png";
import { useAuthStore } from "../../../common/stores/authStore";
import { useAccountantDashboardStore } from "../../../common/stores/accountantDashboardStore";

const tabLabels: Record<string, string> = {
  dashboard: "Dashboard",
  invoices: "Invoices",
  "bank-statements": "Bank Statements",
  transactions: "Transactions",
  payroll: "Payroll",
  categories: "Categories",
  claims: "Claims",
  settings: "Settings"
};

export function AccountantDashboard() {
  const navigate = useNavigate();
  
  const clientUser = useAuthStore((state) => state.clientUser);
  const logoutClient = useAuthStore((state) => state.logoutClient);
  
  const activeTab = useAccountantDashboardStore((state) => state.accountantActiveTab);
  const setActiveTab = useAccountantDashboardStore((state) => state.setAccountantActiveTab);

  const handleSelectTab = (tabId: string) => {
    if (tabId === "logout") {
      logoutClient();
      navigate("/accountant/login");
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans antialiased text-[#111827]">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0b1524] text-white flex flex-col justify-between flex-shrink-0 p-6">
        <div>
          {/* Logo Header */}
          <div className="mb-8 pl-2">
            <div className="text-xl font-black tracking-tight flex items-center">
              <span>Fin</span>
              <span className="text-[#635BFF]">Scrybe</span>
            </div>
            <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
              Financial Intelligence
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "invoices", label: "Invoices", icon: FileText },
              { id: "bank-statements", label: "Bank Statements", icon: Landmark },
              { id: "transactions", label: "Transactions", icon: History },
              { id: "payroll", label: "Payroll", icon: Receipt },
              { id: "categories", label: "Categories", icon: Layers },
              { id: "claims", label: "Claims", icon: ShieldAlert }
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

        {/* Bottom Options */}
        <div className="space-y-2">
          {/* Divider */}
          <div className="border-t border-slate-800 my-4"></div>

          <ul className="space-y-1">
            {[
              { id: "settings", label: "Settings", icon: Settings },
              { id: "logout", label: "Logout", icon: LogOut }
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
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={20} />
          </button>
          
          {/* Divider */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                {clientUser?.fullName || "Sarah Johnson"}
              </h2>
              <span className="text-[10px] font-bold text-slate-400">Senior Accountant</span>
            </div>
            <img 
              src={adminAvatar} 
              className="w-10 h-10 rounded-full border border-slate-200 object-cover" 
              alt="Sarah Johnson Avatar" 
            />
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm text-center max-w-md w-full">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
              Welcome to Accountant {tabLabels[activeTab] || activeTab}
            </h1>
            <p className="text-slate-500 font-semibold text-sm">
              This is a placeholder page for the Accountant {tabLabels[activeTab] || activeTab} view.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
export default AccountantDashboard;
