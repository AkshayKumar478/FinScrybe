import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../common/stores/authStore";
import { companyAdminApi } from "../api";

export const CompanyAdminDashboard = () => {
  const navigate = useNavigate();
  const companyAdmin = useAuthStore((state) => state.companyAdmin);

  const logout = async () => {
    await companyAdminApi.logout();
    useAuthStore.getState().logoutCompanyAdmin();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Company Admin Portal</p>
          <h1 className="mt-2 text-3xl font-extrabold">Welcome, {companyAdmin?.fullName}</h1>
          <p className="mt-2 text-slate-500">Your session is active.</p>
        </div>
        <button className="rounded-lg border px-4 py-2 font-semibold" onClick={logout}>Sign out</button>
      </div>
    </main>
  );
};
