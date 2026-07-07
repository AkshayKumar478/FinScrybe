import type { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterCompanyPage } from "./pages/RegisterCompanyPage";
import { AcceptInvitationPage } from "./pages/AcceptInvitationPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterCompanyPage />
  },
  {
    path: "/accept-invitation",
    element: <AcceptInvitationPage />
  }
];
