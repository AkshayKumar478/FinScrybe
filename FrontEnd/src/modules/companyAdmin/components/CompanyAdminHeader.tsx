import { Bell, HelpCircle, Menu } from "lucide-react";
import adminAvatar from "../../../assets/admin_avatar.png";

interface CompanyAdminHeaderProps {
  adminName: string;
  adminRole?: string;
  onToggleMobile: () => void;
}

export function CompanyAdminHeader({
  adminName,
  adminRole = "Chief Financial Officer",
  onToggleMobile,
}: CompanyAdminHeaderProps) {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-slate-200/80 bg-white/70 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Menu Toggle Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Brand indicator for mobile */}
        <div className="md:hidden text-lg font-black tracking-tight select-none">
          <span className="text-[#0f172a]">Fin</span>
          <span className="text-[#635BFF]">Scrybe</span>
        </div>
      </div>

      {/* Right Action Icons & User Info */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#635BFF]" />
        </button>

        {/* Help Circle */}
        <button
          type="button"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors"
          aria-label="Help and support"
        >
          <HelpCircle size={18} />
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              {adminName || "Alex Stratton"}
            </span>
            <span className="text-[11px] text-slate-400 font-medium leading-tight">
              {adminRole || "Chief Financial Officer"}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full ring-2 ring-slate-100 overflow-hidden bg-slate-100 shrink-0">
            <img
              src={adminAvatar}
              alt={adminName || "User avatar"}
              className="w-full h-full object-cover"
              onError={(e) => {
                
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
