import { Router } from "express";

import adminRoutes from "../modules/admin/routes/admin.routes";
import companyRoutes from "../modules/company/routes/company.routes";
import companyAdminRoutes from "../modules/companyAdmin/routes/companyAdmin.routes";

const router = Router();


router.use("/admin", adminRoutes);
router.use("/companies", companyRoutes);
router.use("/company-admin", companyAdminRoutes);

export default router;
