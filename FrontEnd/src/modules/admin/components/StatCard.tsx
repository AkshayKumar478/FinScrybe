import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { PlatformStat } from "../types/admin";

interface StatCardProps {
  stat: PlatformStat;
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon ${stat.tone}`}>
          <Icon size={18} />
        </div>
        <div className={`trend-chip ${stat.trend}`}>
          {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {stat.delta}
        </div>
      </div>

      <div className="stat-card-body">
        <strong>{stat.value}</strong>
        <h3>{stat.label}</h3>
        <p>{stat.detail}</p>
      </div>
    </article>
  );
}
