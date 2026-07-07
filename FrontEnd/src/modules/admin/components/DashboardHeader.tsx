import { Bell, ChevronDown, Settings, UserCircle2 } from "lucide-react";

interface DashboardHeaderProps {
  adminName: string;
  adminEmail: string;
  pageTitle: string;
  profileOpen: boolean;
  onToggleProfile: () => void;
  onLogout: () => void;
}

export function DashboardHeader({
  adminName,
  adminEmail,
  pageTitle,
  profileOpen,
  onToggleProfile,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <p className="eyebrow">FinScrybe Super Admin</p>
        <h1>{pageTitle}</h1>
      </div>

      <div className="header-actions">
        <button type="button" className="notification-button" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        <div className="profile-shell">
          <button type="button" className="profile-trigger" onClick={onToggleProfile}>
            <div className="avatar-circle">AC</div>
            <div className="profile-copy">
              <strong>{adminName}</strong>
              <span>{adminEmail}</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {profileOpen ? (
            <div className="profile-dropdown">
              <div className="profile-dropdown-section">
                <div className="dropdown-notice">
                  <Bell size={14} />
                  <span>Live registration approvals are connected to backend APIs.</span>
                </div>
              </div>
              <button type="button" className="dropdown-action">
                <UserCircle2 size={16} />
                Profile
              </button>
              <button type="button" className="dropdown-action">
                <Settings size={16} />
                Settings
              </button>
              <button type="button" className="dropdown-action logout" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
