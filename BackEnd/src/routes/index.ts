import { Router } from "express";

import adminRoutes from "../modules/admin/routes/admin.routes";
import companyRoutes from "../modules/company/routes/company.routes";

const router = Router();


router.use("/admin", adminRoutes);
router.use("/companies", companyRoutes);

export default router;
