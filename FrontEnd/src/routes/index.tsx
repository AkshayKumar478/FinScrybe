import { createBrowserRouter } from "react-router-dom";
import { landingRoutes } from "./landing.routes";

import { adminRoutes } from "./admin.routes";
import { companyAdminRoutes } from "./companyAdmin.routes";
import { companyRoutes } from "./company.routes";

export const router = createBrowserRouter([
  ...landingRoutes,
  ...adminRoutes,
  ...companyAdminRoutes,
  ...companyRoutes,
]);

export default router;
