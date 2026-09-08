import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import type { ReactNode } from "react";

interface AuthGuardProps {
  type: "clientUser" | "superAdmin" | "companyAdmin";
  mode: "protected" | "guest";
  redirectTo: string;
  children: ReactNode;
}

function AuthGuard({ type, mode, redirectTo, children }: AuthGuardProps) {
  const user = useAuthStore((state) => state[type]);
  const isSuperAdminSessionChecked = useAuthStore(
    (state) => state.isSuperAdminSessionChecked
  );

  if (type === "superAdmin" && !isSuperAdminSessionChecked) {
    return null;
  }

  const isAuthenticated = Boolean(user);

  if (mode === "protected" && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (mode === "guest" && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

export default AuthGuard;
