import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import type { NavItem } from "../../../types/admin";

interface SidebarProps {
  items: NavItem[];
  activeItem: string;
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
  onSelect: (id: string) => void;
}

export function Sidebar({
  items,
  activeItem,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onToggleMobile,
  onSelect,
}: SidebarProps) {
  return (
    <>
      <button
        type="button"
        className="mobile-nav-trigger"
        onClick={onToggleMobile}
        aria-label="Toggle navigation"
      >
        <Menu size={20} />
      </button>

      <aside className={`sidebar-shell ${collapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand-row">
            <BrandLogo compact={collapsed} />
            <button
              type="button"
              className="icon-button"
              onClick={onToggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>

          <nav className="sidebar-nav" aria-label="Primary">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                  onClick={() => onSelect(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-footnote">
          <p>AI-powered financial operations platform</p>
        </div>
      </aside>

      {mobileOpen ? <button type="button" className="sidebar-backdrop" onClick={onToggleMobile} /> : null}
    </>
  );
}
