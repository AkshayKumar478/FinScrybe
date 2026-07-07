import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="bg-slate-900 bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2rem] p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Make Smarter Financial Decisions</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Join 500+ enterprises using FinScrybe to automate their finance ops and unlock strategic growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="px-8 py-4 rounded-full text-base font-semibold text-white bg-finscrybe-primary hover:bg-finscrybe-hover shadow-[0_4px_6px_-1px_rgba(99,91,255,0.2)] transition-all"
            >
              Register Company
            </Link>
            <button className="px-8 py-4 rounded-full text-base font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
