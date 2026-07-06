import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section className="py-24 text-center px-6">
      <div className="container mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-finscrybe-text mb-6">
          Transform Financial Data Into <span className="text-finscrybe-primary">Business Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-finscrybe-muted max-w-2xl mx-auto mb-10">
          Harness the power of AI-driven OCR and predictive forecasting to unlock real-time visibility into your enterprise finances. Automate accounting and drive strategic decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/signup" 
            className="px-8 py-3.5 rounded-full text-base font-semibold text-white bg-finscrybe-primary hover:bg-finscrybe-hover shadow-[0_4px_6px_-1px_rgba(99,91,255,0.2)] transition-all"
          >
            Get Started
          </Link>
          <button className="px-8 py-3.5 rounded-full text-base font-semibold text-finscrybe-text border border-finscrybe-border hover:bg-slate-50 transition-colors">
            Book a Demo
          </button>
        </div>

        <DashboardPreview />

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
          <div className="flex items-center gap-2 text-sm font-medium text-finscrybe-muted">
            <CheckCircle2 size={18} className="text-finscrybe-primary" /> OCR Processing
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-finscrybe-muted">
            <CheckCircle2 size={18} className="text-finscrybe-primary" /> AI Insights
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-finscrybe-muted">
            <CheckCircle2 size={18} className="text-finscrybe-primary" /> Bank Analysis
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-finscrybe-muted">
            <CheckCircle2 size={18} className="text-finscrybe-primary" /> Reports
          </div>
        </div>
      </div>
    </section>
  );
}
