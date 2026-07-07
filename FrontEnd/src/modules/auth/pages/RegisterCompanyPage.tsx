import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Briefcase,
  Mail,
  Phone,
  User,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Loader2,
  AlertCircle
} from "lucide-react";

type SubscriptionPlan = "MONTHLY" | "YEARLY";

export function RegisterCompanyPage() {

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Step 1: Company Info
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  // Step 2: Subscription
  const [subscription, setSubscription] = useState<SubscriptionPlan>("MONTHLY");

  // Step 3: Admin Info
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !industry || !companyEmail || !companyPhone) {
      setError("Please fill in all company fields.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFullName || !adminEmail || !adminPhoneNumber || !adminPassword || !confirmPassword) {
      setError("Please fill in all admin fields.");
      return;
    }
    if (adminPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (adminPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/company/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          industry,
          companyEmail,
          companyPhone,
          adminFullName,
          adminEmail,
          adminPassword,
          adminPhoneNumber
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Save subscription details in localStorage for future use
      localStorage.setItem("finscrybe_pending_subscription", subscription);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-sans antialiased p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Registration Pending</h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
            Your company has been created and your Primary Admin account is linked. However, your account is currently <strong>Waiting for Super Admin Approval</strong>. You will be notified by email once approved.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE PANEL */}
      <section className="hidden md:flex w-full md:w-[40%] bg-[#0b1524] text-white p-8 md:p-12 flex-col justify-between items-start">
        <div className="w-full">
          <Link to="/" className="text-2xl font-black tracking-tight mb-12 flex items-center">
            <span>Fin</span>
            <span className="text-[#635BFF]">Scrybe</span>
          </Link>

          <div className="space-y-8 mt-12">
            <div className={`flex items-start gap-4 transition-opacity ${step >= 1 ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${step >= 1 ? "bg-[#635BFF] text-white" : "bg-slate-800 text-slate-400"}`}>
                1
              </div>
              <div>
                <h3 className="text-lg font-bold">Company Information</h3>
                <p className="text-sm text-slate-400 mt-1">Tell us about your organization.</p>
              </div>
            </div>

            <div className={`flex items-start gap-4 transition-opacity ${step >= 2 ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${step >= 2 ? "bg-[#635BFF] text-white" : "bg-slate-800 text-slate-400"}`}>
                2
              </div>
              <div>
                <h3 className="text-lg font-bold">Subscription Selection</h3>
                <p className="text-sm text-slate-400 mt-1">Choose the right plan for your team.</p>
              </div>
            </div>

            <div className={`flex items-start gap-4 transition-opacity ${step >= 3 ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${step >= 3 ? "bg-[#635BFF] text-white" : "bg-slate-800 text-slate-400"}`}>
                3
              </div>
              <div>
                <h3 className="text-lg font-bold">Primary Admin Sign Up</h3>
                <p className="text-sm text-slate-400 mt-1">Create your personal access credentials.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE PANEL */}
      <main className="w-full md:w-[60%] flex flex-col justify-center items-center px-6 py-12 md:p-12 overflow-y-auto">
        <div className="max-w-xl w-full my-auto">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-start gap-3">
              <AlertCircle className="shrink-0 mt-0.5 text-rose-500" size={18} />
              <p className="text-sm font-semibold">{error}</p>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleNextToStep2} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Register Company</h2>
                <p className="text-slate-500 mt-2 font-medium">Step 1: Enter your business details.</p>
              </header>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="Acme Corp" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Industry</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="Technology" value={industry} onChange={e => setIndustry(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Company Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="email" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="contact@acme.com" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Company Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="+1 (555) 000-0000" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} required />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-sm">
                  Continue to Subscription <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextToStep3} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Choose Subscription</h2>
                <p className="text-slate-500 mt-2 font-medium">Step 2: Select the best plan for your organization.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Monthly Plan */}
                <div 
                  onClick={() => setSubscription("MONTHLY")}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${subscription === "MONTHLY" ? "border-[#635BFF] bg-indigo-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Monthly Plan</h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Ideal For Startups</p>
                    </div>
                    {subscription === "MONTHLY" && <CheckCircle2 className="text-[#635BFF]" size={24} />}
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-slate-900">₹999</span>
                    <span className="text-slate-500 text-sm font-medium"> / Month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> 1 Company Admin</li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> 2 Executive Users</li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> 2 Accountants</li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> OCR & AI Insights</li>
                  </ul>
                </div>

                {/* Yearly Plan */}
                <div 
                  onClick={() => setSubscription("YEARLY")}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${subscription === "YEARLY" ? "border-[#635BFF] bg-indigo-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">Yearly Plan</h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium">For Growing Businesses</p>
                    </div>
                    {subscription === "YEARLY" && <CheckCircle2 className="text-[#635BFF]" size={24} />}
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-slate-900">₹9,999</span>
                    <span className="text-slate-500 text-sm font-medium"> / Year</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> Up to 5 Admins</li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> 10 Executive Users</li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> 10 Accountants</li>
                    <li className="flex items-start gap-2 text-sm text-slate-600 font-medium"><Check size={16} className="text-[#635BFF] shrink-0 mt-0.5" /> Priority Support</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button type="button" onClick={() => setStep(1)} className="flex items-center justify-center p-3.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
                  <ArrowLeft size={18} />
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-sm">
                  Continue to Admin Setup <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Primary Admin Sign Up</h2>
                <p className="text-slate-500 mt-2 font-medium">Step 3: Create your primary administrator account.</p>
              </header>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Admin Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="John Doe" value={adminFullName} onChange={e => setAdminFullName(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="email" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="admin@acme.com" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Admin Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="+1 (555) 111-1111" value={adminPhoneNumber} onChange={e => setAdminPhoneNumber(e.target.value)} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="password" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="••••••••" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="password" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-[#635BFF] focus:bg-white transition-all outline-none" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button type="button" onClick={() => setStep(2)} className="flex items-center justify-center p-3.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
                  <ArrowLeft size={18} />
                </button>
                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-sm disabled:opacity-70">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Complete Registration"}
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}
