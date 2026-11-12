import { Router } from "express";

import adminRoutes from "../modules/admin/routes/admin.routes";
import companyRoutes from "../modules/company/routes/company.routes";
import companyAdminRoutes from "../modules/companyAdmin/routes/companyAdmin.routes";
import invitationRouter from "../modules/companyAccountantInvitation/routes/invitation.routes";
import accountantRouter from "../modules/companyAccountant/routes/accountant.routes";


const router = Router();


router.use("/admin", adminRoutes);
router.use("/companies", companyRoutes);
router.use("/company-admin", companyAdminRoutes);
router.use('/accountant',invitationRouter)
router.use('/accountant',accountantRouter)

export default router;
