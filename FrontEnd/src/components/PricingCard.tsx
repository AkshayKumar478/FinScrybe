import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  priceDisplay: string;
  priceSubtext: string;
  subtitle: string;
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({ 
  name, 
  priceDisplay,
  priceSubtext,
  subtitle,
  features, 
  isPopular = false 
}: PricingCardProps) {
  return (
    <div className={`relative bg-white rounded-[24px] p-8 md:p-12 ${
      isPopular 
        ? "border-2 border-finscrybe-primary shadow-[0_20px_40px_-10px_rgba(99,91,255,0.15)]" 
        : "border border-finscrybe-border"
    }`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-finscrybe-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Most Popular
        </div>
      )}
      
      <div className="text-xl font-bold mb-2">{name}</div>
      <div className="text-finscrybe-muted text-[0.9375rem] mb-6">{subtitle}</div>
      <div className="mb-8">
        <span className="text-5xl font-extrabold">{priceDisplay}</span>
        <span className="text-finscrybe-muted font-medium">{priceSubtext}</span>
      </div>
      
      <div className="space-y-4 mb-10">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[0.9375rem] text-finscrybe-text">
            <Check size={20} className="text-emerald-500 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <button 
        className={`w-full py-3.5 rounded-full font-semibold transition-all ${
          isPopular 
            ? "bg-finscrybe-primary text-white hover:bg-finscrybe-hover shadow-[0_4px_6px_-1px_rgba(99,91,255,0.2)]" 
            : "border border-finscrybe-border text-finscrybe-text hover:bg-slate-50"
        }`}
      >
        Get Started
      </button>
    </div>
  );
}
