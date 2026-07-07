import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle, Lock, Mail, ShieldCheck } from "lucide-react";
import loginPanelBg from "../../../assets/login_panel_bg.png";
import { useAccountantLogin } from "../hooks/useAccountantAuth";

export function AccountantLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isSubmitting, formError } = useAccountantLogin();
  const { register, formState: { errors } } = form;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans antialiased text-[#111827]">
      {/* LEFT COLUMN - Branding & Graphic */}
      <section className="w-full md:w-[40%] bg-gradient-to-br from-[#0f172a] to-[#4f46e5] p-8 md:p-12 flex flex-col justify-between items-start text-white relative overflow-hidden">
        {/* Overlay mesh */}
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none"></div>
        
        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 max-w-sm relative z-10 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
            Financial Intelligence For Modern Businesses
          </h1>
          <p className="text-white/80 text-sm leading-relaxed">
            Centralize financial data, automate invoice processing, generate AI-powered insights, and forecast future business performance with FinScrybe.
          </p>
        </div>

        {/* Workspace Graphic */}
        <div className="w-full max-w-xs mx-auto my-8 relative z-10 flex items-center justify-center">
          <img 
            src={loginPanelBg} 
            alt="Workspace Illustration" 
            className="w-full h-auto object-contain opacity-95 transition-opacity" 
          />
        </div>

        {/* Footer info badge */}
        <div className="flex items-center gap-2 bg-[#0f172a]/60 border border-white/10 rounded-xl px-4 py-2 text-xs font-semibold text-white/90 relative z-10 backdrop-blur-sm">
          <ShieldCheck size={14} className="text-[#635BFF]" />
          <span>Secure Workspace Instance v2.4</span>
        </div>
      </section>

      {/* RIGHT COLUMN - Login Form */}
      <main className="w-full md:w-[60%] flex flex-col justify-between items-center px-6 py-12 md:p-12 overflow-y-auto bg-[#f8fafc]">
        <div className="max-w-md w-full my-auto">
          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="text-2xl font-black tracking-tight mb-2">
              <span className="text-[#0f172a]">Fin</span>
              <span className="text-[#635BFF]">Scrybe</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Sign in to access your FinScrybe workspace.</p>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="sarah.johnson@enterprise.com"
                    className={`w-full pl-12 pr-4 py-3 bg-[#f8fafc] border rounded-xl font-medium placeholder-slate-400 text-[#111827] focus:outline-none focus:bg-white transition-all text-sm ${
                      errors.email ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:border-[#635BFF]"
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 font-bold mt-1.5 pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="pass" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    className={`w-full pl-12 pr-12 py-3 bg-[#f8fafc] border rounded-xl font-medium placeholder-slate-400 text-[#111827] focus:outline-none focus:bg-white transition-all text-sm ${
                      errors.password ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:border-[#635BFF]"
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-500 font-bold mt-1.5 pl-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 font-semibold text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#635BFF] border-slate-300 focus:ring-[#635BFF]"
                  />
                  <span>Remember Me</span>
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Forgot password is currently locked. Please request a recovery link from your administrator.");
                  }} 
                  className="text-[#635BFF] hover:underline font-bold"
                >
                  Forgot Password?
                </a>
              </div>

              {/* API Form Error */}
              {formError && (
                <div className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-200 rounded-lg p-3">
                  {formError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#635BFF] hover:bg-[#5448F7] disabled:bg-indigo-300 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_12px_rgba(99,91,255,0.25)] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin" size={16} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>

          {/* Don't have an account link */}
          <div className="text-center mt-6">
            <span className="text-sm font-medium text-slate-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#635BFF] hover:underline font-bold">
                Create Account
              </Link>
            </span>
          </div>
        </div>

        {/* Footer block */}
        <footer className="w-full flex justify-between text-[11px] font-semibold text-slate-400 pt-8 border-t border-slate-200 max-w-lg">
          <span>© 2026 FinScrybe Financial Intelligence. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">Terms of Service</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
export default AccountantLoginPage;
