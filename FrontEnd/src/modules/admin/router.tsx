import type { RouteObject } from "react-router-dom";
import { SuperAdminLoginPage } from "./pages/SuperAdminLoginPage";
import { SuperAdminDashboard } from "./pages/SuperAdminDashboard";
import AuthGuard from "../../common/components/AuthGaurd";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: (
      <AuthGuard type="superAdmin" mode="guest" redirectTo="/admin/dashboard">
        <SuperAdminLoginPage />
      </AuthGuard>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AuthGuard type="superAdmin" mode="protected" redirectTo="/admin/login">
        <SuperAdminDashboard />
      </AuthGuard>
    ),
  },
];
