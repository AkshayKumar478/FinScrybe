import { BrandLogo } from "../features/super-admin/components/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-finscrybe-border bg-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="scale-90 origin-left mb-4">
              <BrandLogo />
            </div>
            <p className="text-finscrybe-muted text-sm leading-relaxed max-w-xs">
              FinScrybe is the leading premium financial intelligence and budget management platform for modern enterprises.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-6 text-finscrybe-text">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">API docs</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 text-finscrybe-text">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 text-finscrybe-text">Social</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-finscrybe-muted hover:text-finscrybe-text transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-finscrybe-border text-sm text-finscrybe-muted">
          <div>&copy; {new Date().getFullYear()} FinScrybe Inc. All rights reserved.</div>
          <div className="mt-4 md:mt-0">Made with ❤️ for finance teams.</div>
        </div>
      </div>
    </footer>
  );
}
