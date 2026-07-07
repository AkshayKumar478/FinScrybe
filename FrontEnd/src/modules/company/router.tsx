import type { RouteObject } from "react-router-dom";
import { ClientDashboard } from "./pages/ClientDashboard";
import { ProtectedRoute } from "../../common/components/ProtectedRoute";

export const companyRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role="client">
        <ClientDashboard />
      </ProtectedRoute>
    )
  }
];
