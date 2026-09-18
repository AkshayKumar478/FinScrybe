import type { RouteObject } from "react-router-dom";
import { CompanyRegistrationPage } from "./pages/CompanyRegistrationPage";

export const companyRoutes: RouteObject[] = [
  {
    path: "/companies/register",
    element: <CompanyRegistrationPage />,
  },
];
