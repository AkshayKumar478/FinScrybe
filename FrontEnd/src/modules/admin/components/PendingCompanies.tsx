import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useAuthStore } from "../../../common/stores/authStore";

interface CompanyDto {
  id: string;
  companyName: string;
  industry: string;
  companyEmail: string;
  companyPhone: string;
  status: string;
  createdAt: string;
}

export function PendingCompanies() {
  const [companies, setCompanies] = useState<CompanyDto[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.superAdminToken);

  const fetchPending = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/companies/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCompanies(data);
      } else {
        console.error("Failed to fetch pending companies:", data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, [token]);

  const handleApprove = async (companyId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/companies/${companyId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "APPROVED" }),
      });
      if (res.ok) {
        setCompanies(companies.filter(c => c.id !== companyId));
      } else {
        const error = await res.json();
        console.error("Failed to approve company:", error);
        alert("Failed to approve company: " + (error.message || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while approving the company.");
    }
  };

  if (loading) return (
    <div className="flex justify-center p-12">
      <Loader2 className="animate-spin text-[#635BFF]" size={32} />
    </div>
  );

  if (companies.length === 0) return (
    <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-3xl p-12 shadow-sm text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="text-slate-400" size={24} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No pending requests</h3>
      <p className="text-sm font-medium text-slate-500">All company registrations have been processed.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-900">Pending Registrations</h3>
        <p className="text-xs font-medium text-slate-500 mt-1">Review and approve companies waiting for access.</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {companies.map((c) => (
          <li key={c.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                {c.companyName}
                <span className="bg-amber-100 text-amber-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                  Pending
                </span>
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <p className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {c.industry}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {c.companyEmail}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {c.companyPhone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleApprove(c.id)} 
                className="flex items-center gap-2 px-5 py-2.5 bg-[#635BFF] hover:bg-indigo-600 text-white rounded-xl text-sm font-bold transition-all shadow-sm shadow-indigo-500/20 active:scale-95"
              >
                <CheckCircle size={16} />
                Approve Company
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
