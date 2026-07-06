import { createBrowserRouter } from "react-router-dom";
import { LandingLayout } from "../layouts/LandingLayout";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../features/auth/components/LoginPage";
import { SignupPage } from "../features/auth/components/SignupPage";
import { ClientDashboard } from "../features/dashboard/components/ClientDashboard";
import { SuperAdminLoginPage } from "../features/super-admin/components/SuperAdminLoginPage";
import { SuperAdminDashboard } from "../features/super-admin/components/SuperAdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/register",
    element: <SignupPage />
  },
  {
    path: "/dashboard",
    element: <ClientDashboard />
  },
  {
    path: "/admin/login",
    element: <SuperAdminLoginPage />
  },
  {
    path: "/admin/dashboard",
    element: <SuperAdminDashboard />
  }
]);
export default router;
