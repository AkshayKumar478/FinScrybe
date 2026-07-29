import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "admin" | "client" | "accountant";
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const clientUser = useAuthStore((state) => state.clientUser);
  const superAdmin = useAuthStore((state) => state.superAdmin);

  if (role === "admin") {
    if (!superAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
  } else if (role === "client") {
    if (!clientUser) {
      return <Navigate to="/login" replace />;
    }
  } else if (role === "accountant") {
    // Accountant roles currently check local auth store as well
    if (!clientUser) {
      return <Navigate to="/accountant/login" replace />;
    }
  }

  return <>{children}</>;
}
