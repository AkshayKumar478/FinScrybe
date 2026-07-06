import { Link } from "react-router-dom";
import { BrandLogo } from "../features/super-admin/components/BrandLogo";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-finscrybe-border py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="scale-90 origin-left">
          <Link to="/">
            <BrandLogo />
          </Link>
        </div>
        
        <ul className="hidden md:flex items-center gap-8">
          <li><a href="#features" className="text-sm font-medium text-finscrybe-muted hover:text-finscrybe-text transition-colors">Features</a></li>
          <li><a href="#how-it-works" className="text-sm font-medium text-finscrybe-muted hover:text-finscrybe-text transition-colors">How It Works</a></li>
          <li><a href="#pricing" className="text-sm font-medium text-finscrybe-muted hover:text-finscrybe-text transition-colors">Pricing</a></li>
          <li><a href="#contact" className="text-sm font-medium text-finscrybe-muted hover:text-finscrybe-text transition-colors">Contact</a></li>
        </ul>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-finscrybe-text border border-finscrybe-border hover:bg-slate-50 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-finscrybe-primary hover:bg-finscrybe-hover shadow-[0_4px_6px_-1px_rgba(99,91,255,0.2)] transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
