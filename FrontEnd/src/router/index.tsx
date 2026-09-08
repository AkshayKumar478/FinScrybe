import { createBrowserRouter } from "react-router-dom";
import { landingRoutes } from "../modules/landing/router";

import { adminRoutes } from "../modules/admin/router";
import { companyAdminRoutes } from "../modules/companyAdmin/router";

export const router = createBrowserRouter([
  ...landingRoutes,
  ...adminRoutes,
  ...companyAdminRoutes,
]);

export default router;
