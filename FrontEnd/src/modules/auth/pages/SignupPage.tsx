import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Check, 
  User,
  Mail,
  Lock,
  Building2,
  Phone,
  Briefcase,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export function SignupPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Company Data
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  
  // Admin Data
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !industry || !companyEmail || !companyPhone) {
      setError("Please fill in all company fields.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminFullName || !adminEmail || !adminPhoneNumber || !adminPassword || !confirmPassword) {
      setError("Please fill in all admin fields.");
      return;
    }
    if (adminPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (adminPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms of Service.");
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
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans antialiased">
      {/* LEFT SIDE PANEL */}
      <section className="hidden md:flex w-full md:w-[45%] bg-[#f1f5f9] p-8 md:p-12 flex-col justify-between items-start border-r border-slate-200">
        <div className="w-full">
          <div className="text-2xl font-black tracking-tight mb-12 flex items-center">
            <span className="text-slate-900">Fin</span>
            <span className="text-[#635BFF]">Scrybe</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.1] mb-6">
            Turn Financial Data Into Business Intelligence
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md mb-10">
            Automate manual workflows with enterprise-grade OCR, real-time AI insights, and predictive forecasting designed for modern finance teams.
          </p>

          <ul className="space-y-4 mb-12">
            {["OCR Invoice Processing", "AI Financial Insights", "Revenue Forecasting"].map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-[#635BFF] flex items-center justify-center text-white flex-shrink-0">
                  <Check size={12} strokeWidth={3} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RIGHT SIDE PANEL */}
      <main className="w-full md:w-[55%] flex flex-col justify-center items-center px-6 py-12 md:p-12 overflow-y-auto">
        <div className="max-w-md w-full my-auto">
          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-emerald-500 w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight mb-4">Registration Successful!</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Your company profile has been submitted. Our super administrators will review your registration and grant access shortly. You will be notified once approved.
              </p>
              <Link to="/login" className="inline-flex items-center justify-center w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                Return to Login
              </Link>
            </div>
          ) : (
            <>
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-[#635BFF]" : "bg-slate-100"}`}></span>
                  <span className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-[#635BFF]" : "bg-slate-100"}`}></span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Create Account</h2>
                <p className="text-slate-500 mt-2 font-medium">
                  {step === 1 ? "Step 1: Tell us about your company." : "Step 2: Create your admin profile."}
                </p>
              </header>

              {error && (
                <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-bold text-center">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <form className="space-y-5" onSubmit={handleNextStep}>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="text" placeholder="Acme Corp" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Industry</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="text" placeholder="Technology" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={industry} onChange={e => setIndustry(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Company Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="email" placeholder="contact@acme.com" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={companyEmail} onChange={e => setCompanyEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Company Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="text" placeholder="+1 (555) 000-0000" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={companyPhone} onChange={e => setCompanyPhone(e.target.value)} required />
                    </div>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 mt-4 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-sm">
                    Next Step <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                <form className="space-y-5" onSubmit={handleSignup}>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Admin Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="text" placeholder="Johnathan Doe" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={adminFullName} onChange={e => setAdminFullName(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="email" placeholder="j.doe@acme.com" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Admin Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input type="text" placeholder="+1 (555) 111-1111" className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={adminPhoneNumber} onChange={e => setAdminPhoneNumber(e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Confirm Pass</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mt-2">
                    <input type="checkbox" id="terms" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-1 flex-shrink-0" />
                    <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed font-medium">
                      I agree to the <a href="#" className="text-[#635BFF] font-bold">Terms of Service</a> and <a href="#" className="text-[#635BFF] font-bold">Privacy Policy</a>.
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-6">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center justify-center p-3.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
                      <ArrowLeft size={18} />
                    </button>
                    <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-indigo-600 transition-all disabled:opacity-70 shadow-sm">
                      {loading ? <Loader2 className="animate-spin" size={18} /> : "Submit Registration"}
                    </button>
                  </div>
                </form>
              )}

              <p className="text-center text-sm font-semibold text-slate-500 mt-8">
                Already have an account? <Link to="/login" className="text-[#635BFF] hover:text-indigo-700 ml-1">Login instead</Link>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
