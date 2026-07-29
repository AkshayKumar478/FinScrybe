import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { CompanyStatus } from "../../../common/constants/enums";
import { adminApi, type CompanyRecord } from "../api";

export function PendingCompanies() {
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);

  useEffect(() => {
    const loadPendingCompanies = async () => {
      try {
        const data = await adminApi.listPendingCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Failed to load pending companies:", error);
      }
    };

    void loadPendingCompanies();
  }, []);

  const handleApprove = async (companyId: string) => {
    try {
      await adminApi.updateCompanyStatus(companyId, CompanyStatus.APPROVED);
      setCompanies((currentCompanies) =>
        currentCompanies.filter((company) => company.id !== companyId)
      );
    } catch (e) {
      console.error(e);
      alert("An error occurred while approving the company.");
    }
  };

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
