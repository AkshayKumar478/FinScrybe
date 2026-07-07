import type { RouteObject } from "react-router-dom";
import { AccountantLoginPage } from "./pages/AccountantLoginPage";
import { AccountantDashboard } from "./pages/AccountantDashboard";
import { ProtectedRoute } from "../../common/components/ProtectedRoute";

export const accountantRoutes: RouteObject[] = [
  {
    path: "/accountant/login",
    element: <AccountantLoginPage />
  },
  {
    path: "/accountant/dashboard",
    element: (
      <ProtectedRoute role="accountant">
        <AccountantDashboard />
      </ProtectedRoute>
    )
  }
];
