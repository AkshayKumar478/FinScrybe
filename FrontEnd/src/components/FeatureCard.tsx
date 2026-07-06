import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-finscrybe-border hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="w-12 h-12 bg-indigo-50 text-finscrybe-primary flex items-center justify-center rounded-xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-finscrybe-text">{title}</h3>
      <p className="text-finscrybe-muted text-[0.9375rem] leading-relaxed">{description}</p>
    </div>
  );
}
