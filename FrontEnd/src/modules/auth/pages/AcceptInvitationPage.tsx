import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ShieldCheck, User, Lock, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function AcceptInvitationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const type = searchParams.get("type") || "accountant";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(false);


  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const endpointBase =
    type === "accountant"
      ? "http://localhost:5000/api/invitations"
      : "http://localhost:5000/api/company-admin-invitations";

  useEffect(() => {
    if (!token) {
      setError("No invitation token provided in the URL.");
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch(`${endpointBase}/validate?token=${token}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Invalid or expired invitation token.");


        setValidToken(true);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, type, endpointBase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${endpointBase}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, fullName, phoneNumber, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to activate account.");

      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#635BFF] w-12 h-12" />
          <p className="text-slate-500 font-medium">Validating invitation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] font-sans antialiased p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-200 p-8 md:p-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-indigo-50 text-[#635BFF] rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Activate Account</h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            Complete your profile to join the company workspace.
          </p>
        </div>

        {error && !success && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl flex items-start gap-3">
            <AlertCircle className="shrink-0 mt-0.5 text-rose-500" size={18} />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Account Activated!</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">
              You can now log into FinScrybe. Redirecting to login...
            </p>
            <Link to="/login" className="text-[#635BFF] font-bold hover:underline">
              Go to Login
            </Link>
          </div>
        ) : validToken ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all"
                  placeholder="+1 555 000 0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium placeholder-slate-400 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-2 bg-[#635BFF] text-white rounded-xl font-bold hover:bg-indigo-600 transition-all disabled:opacity-70 shadow-sm"
            >
              {submitting ? <Loader2 className="animate-spin" size={18} /> : "Activate Account"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
