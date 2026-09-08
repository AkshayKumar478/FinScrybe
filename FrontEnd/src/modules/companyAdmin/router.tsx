import type { RouteObject } from "react-router-dom";

import AuthGuard from "../../common/components/AuthGaurd";
import { CompanyAdminDashboard } from "./pages/CompanyAdminDashboard";
import { CompanyAdminLoginPage } from "./pages/CompanyAdminLoginPage";

export const companyAdminRoutes: RouteObject[] = [
  { path: "/login", element: <CompanyAdminLoginPage /> },
  {
    path: "/company-admin/dashboard",
    element: (
      <AuthGuard type="companyAdmin" mode="protected" redirectTo="/login">
        <CompanyAdminDashboard />
      </AuthGuard>
    ),
  },
];
