import { useState } from "react";
import {
  ArrowRight,
  Download,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  MoreHorizontal,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCompanyAdminLogin } from "../hooks/useCompanyAdminLogin";

export const CompanyAdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isSubmitting, formError } = useCompanyAdminLogin();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <main className="min-h-screen flex flex-col lg:flex-row font-sans antialiased text-slate-900 bg-[#F8FAFC]">
      {/* LEFT COLUMN - Soft blue branding & decorative financial illustration */}
      <section className="hidden lg:flex lg:w-1/2 bg-[#DDE9F9] flex-col justify-between p-10 xl:p-16 select-none relative overflow-hidden">
        <div>
          {/* Brand Wordmark */}
          <div className="text-3xl xl:text-4xl font-black tracking-tight">
            <span className="text-[#0B132B]">Fin</span>
            <span className="text-[#635BFF]">Scrybe</span>
          </div>
          {/* Brand Tagline */}
          <p className="mt-2 text-sm xl:text-base text-slate-500 font-normal">
            Intelligence-driven financial orchestration.
          </p>
        </div>

        {/* Decorative Dashboard Illustration */}
        <div className="my-auto w-full max-w-lg mx-auto py-8">
          <div className="bg-white/45 backdrop-blur-sm rounded-3xl p-5 xl:p-6 border border-white/80 shadow-[0_4px_24px_rgba(30,58,138,0.06)]">
            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Revenue Card */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] xl:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    REVENUE
                  </span>
                  <TrendingUp size={14} className="text-[#635BFF] stroke-[2.5]" />
                </div>
                <div className="text-lg xl:text-xl font-extrabold text-slate-900 tracking-tight my-1.5">
                  $2.4M
                </div>
                <div className="text-[10px] xl:text-xs font-semibold text-[#635BFF]">
                  +12.5% vs LY
                </div>
              </div>

              {/* Expenses Card */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] xl:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    EXPENSES
                  </span>
                  <TrendingDown size={14} className="text-rose-500 stroke-[2.5]" />
                </div>
                <div className="text-lg xl:text-xl font-extrabold text-slate-900 tracking-tight my-1.5">
                  $842k
                </div>
                <div className="text-[10px] xl:text-xs font-semibold text-rose-500">
                  -2.1% target
                </div>
              </div>

              {/* Net Profit Card */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] xl:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    NET PROFIT
                  </span>
                  <span className="w-3.5 h-3.5 rounded bg-[#635BFF] flex items-center justify-center text-white text-[9px] font-bold">
                    $
                  </span>
                </div>
                <div className="text-lg xl:text-xl font-extrabold text-slate-900 tracking-tight my-1.5">
                  $1.55M
                </div>
                <div className="text-[10px] xl:text-xs font-semibold text-[#635BFF]">
                  94.2% margin
                </div>
              </div>
            </div>

            {/* Bottom Card - Annual Performance Index Chart */}
            <div className="bg-white rounded-2xl p-5 xl:p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm xl:text-base font-bold text-slate-900">
                  Annual Performance Index
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                    <Download size={13} />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400">
                    <MoreHorizontal size={13} />
                  </div>
                </div>
              </div>

              {/* Visual Decorative Bars */}
              <div className="h-44 xl:h-48 pt-6 flex items-end justify-between gap-2.5 px-2">
                {[
                  { height: "32%", quarter: "Q1" },
                  { height: "52%", quarter: "Q1" },
                  { height: "38%", quarter: "Q2" },
                  { height: "68%", quarter: "Q2" },
                  { height: "58%", quarter: "Q3" },
                  { height: "92%", quarter: "Q3" },
                  { height: "78%", quarter: "Q4" },
                  { height: "85%", quarter: "Q4" },
                ].map((bar, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-[#CCE0F8] hover:bg-[#BBD5F5] rounded-t-lg transition-all"
                    style={{ height: bar.height }}
                  />
                ))}
              </div>

              {/* Quarter Labels */}
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 pt-3 border-t border-slate-100 mt-2 px-3">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Empty placeholder to balance flex-between */}
        <div className="h-4" />
      </section>

      {/* RIGHT COLUMN - Pale login panel */}
      <section className="w-full lg:w-1/2 flex flex-col justify-between items-center p-6 sm:p-10 lg:p-12 min-h-screen overflow-y-auto">
        {/* Mobile Header (visible only on small screens) */}
        <div className="lg:hidden w-full max-w-[440px] pt-4 pb-6 text-center">
          <div className="text-3xl font-black tracking-tight">
            <span className="text-[#0B132B]">Fin</span>
            <span className="text-[#635BFF]">Scrybe</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Intelligence-driven financial orchestration.
          </p>
        </div>

        {/* Centered Login Card */}
        <div className="my-auto w-full max-w-[440px] bg-white rounded-[28px] border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.04)] p-8 sm:p-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 mb-7 font-normal">
              Access your strategic financial suite.
            </p>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit} noValidate>
            {/* Work Email */}
            <div>
              <label
                htmlFor="work-email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Work Email
              </label>
              <input
                id="work-email"
                className="w-full rounded-xl border border-slate-200 bg-[#F4F7FB] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#635BFF] focus:bg-white focus:ring-2 focus:ring-[#635BFF]/15"
                type="email"
                placeholder="cfo@enterprise.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="mt-1.5 block text-xs text-rose-600">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "Please contact your system administrator to reset your password."
                    );
                  }}
                  className="text-xs font-medium text-[#635BFF] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  className="w-full rounded-xl border border-slate-200 bg-[#F4F7FB] px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#635BFF] focus:bg-white focus:ring-2 focus:ring-[#635BFF]/15"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <button
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="mt-1.5 block text-xs text-rose-600">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-[#635BFF] focus:ring-[#635BFF] cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="text-xs text-slate-600 cursor-pointer select-none"
              >
                Keep me signed in for 30 days
              </label>
            </div>

            {/* API Form Error */}
            {formError && (
              <p className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-medium">
                {formError}
              </p>
            )}

            {/* Submit Button */}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#635BFF] hover:bg-[#5448F7] py-3.5 font-semibold text-white shadow-sm transition-all text-sm disabled:opacity-60 cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" size={18} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Contact sales link */}
            <p className="text-center text-xs text-slate-500 pt-2">
              Don't have an account?{" "}
              <Link
                to="/companies/register"
                className="font-semibold text-[#635BFF] hover:underline"
              >
                Contact Sales
              </Link>
            </p>
          </form>
        </div>

        {/* Footer beneath login card */}
        <footer className="w-full max-w-[440px] pt-8 pb-4 text-center select-none">
          {/* Security Certifications */}
          <div className="flex items-center justify-center gap-6 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-slate-400" /> SOC2 TYPE II
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-slate-400" /> 256-BIT AES
            </span>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
            <a
              href="#privacy"
              onClick={(e) => e.preventDefault()}
              className="hover:text-slate-600 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="#terms"
              onClick={(e) => e.preventDefault()}
              className="hover:text-slate-600 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="#help"
              onClick={(e) => e.preventDefault()}
              className="hover:text-slate-600 transition-colors"
            >
              Help Center
            </a>
          </div>

          {/* Copyright notice */}
          <p className="text-[11px] text-slate-400 mt-2.5">
            &copy; 2024 FinIntel AI / FinScrybe. All rights reserved.
          </p>
        </footer>
      </section>
    </main>
  );
};
