import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { useCompanyAdminLogin } from "../hooks/useCompanyAdminLogin";

export const CompanyAdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, isSubmitting, formError } = useCompanyAdminLogin();
  const { register, formState: { errors } } = form;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 px-6 py-12 text-slate-900">
      <section className="mx-auto grid min-h-[620px] max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="flex flex-col justify-between bg-indigo-600 p-8 text-white md:p-12">
          <div>
            <Link to="/" className="text-xl font-black tracking-tight">FinScrybe</Link>
            <p className="mt-20 text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">
              Company portal
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">
              Keep your finance team moving.
            </h1>
            <p className="mt-5 max-w-sm text-indigo-100">
              Sign in to manage your company’s accounting workspace securely.
            </p>
          </div>
          <p className="text-sm text-indigo-200">Secure, role-based access</p>
        </div>

        <div className="flex items-center p-8 md:p-12">
          <div className="w-full">
            <h2 className="text-3xl font-extrabold">Company Admin Login</h2>
            <p className="mt-2 text-sm text-slate-500">Use the email and password created during registration.</p>

            <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
              <label className="block text-sm font-semibold">
                Email address
                <span className="relative mt-2 block">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-indigo-600"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                  />
                </span>
                {errors.email && <span className="mt-1 block text-xs text-rose-600">{errors.email.message}</span>}
              </label>

              <label className="block text-sm font-semibold">
                Password
                <span className="relative mt-2 block">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-12 outline-none focus:border-indigo-600"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password")}
                  />
                  <button
                    className="absolute right-3 top-3 text-slate-500"
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
                {errors.password && <span className="mt-1 block text-xs text-rose-600">{errors.password.message}</span>}
              </label>

              {formError && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{formError}</p>}

              <button
                className="flex w-full justify-center rounded-xl bg-indigo-600 py-3 font-bold text-white disabled:bg-indigo-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoaderCircle className="animate-spin" size={20} /> : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
