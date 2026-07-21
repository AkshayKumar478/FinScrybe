import type { RouteObject } from "react-router-dom";
import { SuperAdminLoginPage } from "./pages/SuperAdminLoginPage";
import { SuperAdminDashboard } from "./pages/SuperAdminDashboard";
import { ProtectedRoute } from "../../common/components/ProtectedRoute";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <SuperAdminLoginPage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <SuperAdminDashboard />
      </ProtectedRoute>
    ),
  },
];
