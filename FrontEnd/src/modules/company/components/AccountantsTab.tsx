import { useState } from "react";
import { useAuthStore } from "../../../common/stores/authStore";
import { usePermissions } from "../../../common/hooks/usePermissions";
import { Mail, Plus, Loader2, CheckCircle2, Building2 } from "lucide-react";

export function AccountantsTab() {
  const token = useAuthStore((state) => state.clientUser?.token);
  const { canInviteUsers } = usePermissions();
  
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Finance");
  const [inviteType, setInviteType] = useState<"accountant" | "admin">("accountant");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const endpoint =
      inviteType === "accountant"
        ? "http://localhost:5000/api/invitations"
        : "http://localhost:5000/api/company-admin-invitations";
    
    const payload =
      inviteType === "accountant"
        ? { email, department }
        : { email, role: "EXECUTIVE" }; // Simplification for now, we can add a role selector

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send invite");

      setSuccessMsg("Invitation sent successfully!");
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!canInviteUsers) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
          <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
          <p className="text-slate-500 font-medium text-sm mt-2">
            You do not have permission to invite new team members. Please contact your Company Admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Invite Team Member</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Send an email invitation to add accountants or executives to your company workspace.
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-500" />
            <p className="text-sm font-bold">{successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl">
            <p className="text-sm font-bold">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleInvite} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Invite Type</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium text-slate-900 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all appearance-none"
                  value={inviteType}
                  onChange={(e) => setInviteType(e.target.value as "accountant" | "admin")}
                >
                  <option value="accountant">Accountant</option>
                  <option value="admin">Company Executive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 text-slate-900 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {inviteType === "accountant" && (
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Department</label>
              <input
                type="text"
                placeholder="Finance, Auditing, etc."
                className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl font-medium placeholder-slate-400 text-slate-900 focus:border-[#635BFF] focus:bg-white text-sm outline-none transition-all"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-[#635BFF] hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-70 shadow-sm"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
