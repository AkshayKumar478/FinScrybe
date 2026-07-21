import { Router } from "express";

import accountantRoutes from "../modules/companyAccountant/routes/accountant.routes";
import adminRoutes from "../modules/admin/routes/admin.routes";
import companyRoutes from "../modules/company/routes/company.routes";
import invitationRoutes from "../modules/companyAccountantInvitation/routes/invitation.routes";

const router = Router();


router.use("/admins", adminRoutes);
router.use("/companies", companyRoutes);

export default router;
