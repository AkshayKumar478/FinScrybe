import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  ShieldAlert, 
  Check, 
  TrendingUp, 
  Mail
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

export function LoginPage() {
  const navigate = useNavigate();
  const setClientUser = useAuthStore((state) => state.setClientUser);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your credentials.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError(null);
    setClientUser({ email, fullName: "Alex Stratton" });
    // Redirect to Client Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE PANEL - Branding & Dashboard Preview */}
      <section className="w-full md:w-[45%] bg-[#f1f5f9] p-8 md:p-12 flex flex-col justify-between items-start border-r border-slate-200">
        <div className="w-full">
          {/* Logo */}
          <div className="text-2xl font-black tracking-tight mb-12 flex items-center">
            <span className="text-slate-900">Fin</span>
            <span className="text-[#635BFF]">Scrybe</span>
          </div>

          {/* Heading & Copy */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
            Turn Financial Data Into Business Intelligence
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md mb-10">
            Automate manual workflows with enterprise-grade OCR, real-time AI insights, and predictive forecasting designed for modern finance teams.
          </p>

          {/* Checklist */}
          <ul className="space-y-4 mb-12">
            {[
              "OCR Invoice Processing",
              "AI Financial Insights",
              "Revenue Forecasting"
            ].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-[#635BFF] flex items-center justify-center text-white flex-shrink-0">
                  <Check size={12} strokeWidth={3} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard Preview Card Component in pure CSS */}
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.04)] mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-4 w-24 bg-slate-100 rounded-full"></div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-100"></div>
              <div className="w-5 h-5 rounded-full bg-slate-100"></div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Stat 1 */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Revenue</span>
              <strong className="text-slate-900 font-extrabold text-sm">$1.2M</strong>
              <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={8} /> 12% vs LY
              </span>
            </div>
            {/* Stat 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Expenses</span>
              <strong className="text-slate-900 font-extrabold text-sm">$420k</strong>
              <span className="text-[9px] font-bold text-rose-500 flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={8} /> 4% vs LY
              </span>
            </div>
            {/* Stat 3 */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Profit</span>
              <strong className="text-slate-900 font-extrabold text-sm">$780k</strong>
              <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                <TrendingUp size={8} /> 8% vs LY
              </span>
            </div>
          </div>

          {/* Simulated chart element */}
          <div className="flex items-end justify-between h-20 pt-4 border-t border-slate-100 gap-3">
            <div className="flex-1 bg-indigo-100 rounded-lg" style={{ height: "45%" }}></div>
            <div className="flex-1 bg-indigo-200 rounded-lg" style={{ height: "70%" }}></div>
            <div className="flex-1 bg-[#635BFF] rounded-lg" style={{ height: "100%" }}></div>
            
            <div className="flex-[2] flex flex-col gap-2 justify-center h-full pl-2">
              <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
              <div className="h-2 w-12 bg-slate-100 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Left Side Footer */}
        <p className="text-xs font-semibold text-slate-400 mt-auto">
          Trusted by 5,000+ global enterprises.
        </p>
      </section>

      {/* RIGHT SIDE PANEL - Form */}
      <main className="w-full md:w-[55%] flex flex-col justify-between items-center px-6 py-12 md:p-12 overflow-y-auto">
        <div className="max-w-md w-full my-auto">
          <header className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 font-medium">Please enter your credentials to access your console.</p>
          </header>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="j.doe@enterprise.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 text-slate-900 focus:outline-none focus:border-[#635BFF] focus:bg-white transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="pass" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="pass"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 text-slate-900 focus:outline-none focus:border-[#635BFF] focus:bg-white transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs py-2">
              <label className="flex items-center gap-2 font-semibold text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-[#635BFF] border-slate-300 focus:ring-[#635BFF]"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <a href="#forgot" className="text-[#635BFF] hover:underline font-bold">
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-200 rounded-lg p-3">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#635BFF] hover:bg-[#5448F7] text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_12px_rgba(99,91,255,0.25)] hover:shadow-[0_6px_16px_rgba(99,91,255,0.35)] transition-all text-sm"
            >
              Sign In to Account
            </button>
          </form>

          {/* Security Features Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative">
              <span className="px-3 bg-white text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Security Features
              </span>
            </div>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-2 border border-slate-100 bg-[#f8fafc] rounded-xl px-4 py-2.5">
              <ShieldCheck className="text-[#635BFF] w-4 h-4" />
              <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">Secure Auth</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-100 bg-[#f8fafc] rounded-xl px-4 py-2.5">
              <Users className="text-[#635BFF] w-4 h-4" />
              <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">Multi-Tenant</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-100 bg-[#f8fafc] rounded-xl px-4 py-2.5">
              <Lock className="text-[#635BFF] w-4 h-4" />
              <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">Enterprise Sec</span>
            </div>
            <div className="flex items-center gap-2 border border-slate-100 bg-[#f8fafc] rounded-xl px-4 py-2.5">
              <ShieldAlert className="text-[#635BFF] w-4 h-4" />
              <span className="text-[10px] font-extrabold tracking-wider text-slate-700 uppercase">Encrypted Data</span>
            </div>
          </div>

          {/* Switch to signup */}
          <p className="text-sm font-medium text-slate-500 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#635BFF] hover:underline font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <footer className="w-full flex justify-between text-[11px] font-semibold text-slate-400 pt-8 border-t border-slate-100">
          <span>© 2026 FinScrybe Enterprise</span>
          <div className="flex gap-4">
            <a href="#compliance" className="hover:underline">Compliance</a>
            <a href="#support" className="hover:underline">Contact Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
