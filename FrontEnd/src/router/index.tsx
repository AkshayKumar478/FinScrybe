import { createBrowserRouter } from "react-router-dom";
import { landingRoutes } from "../modules/landing/router";
import { authRoutes } from "../modules/auth/router";
import { companyRoutes } from "../modules/company/router";
import { adminRoutes } from "../modules/admin/router";
import { accountantRoutes } from "../modules/accountant/router";

export const router = createBrowserRouter([
  ...landingRoutes,
  ...authRoutes,
  ...companyRoutes,
  ...adminRoutes,
  ...accountantRoutes
]);

export default router;
