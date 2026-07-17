import { Router } from "express";

import accountantRoutes from "../modules/companyAccountant/routes/accountant.routes";
import adminRoutes from "../modules/admin/routes/admin.routes";
import authRoutes from "../modules/auth/routes/auth.routes";
import companyRoutes from "../modules/company/routes/company.routes";
import companyAdminRoutes from "../modules/companyAdmin/routes/companyAdmin.routes";
import companyAdminInvitationRoutes from "../modules/companyAdminInvitation/routes/companyAdminInvitation.routes";
import invitationRoutes from "../modules/companyAccountantInvitation/routes/invitation.routes";
import passwordResetRoutes from "../modules/passwordReset/routes/passwordReset.routes";

const router = Router();


router.use("/admins", adminRoutes);
router.use("/companies", companyRoutes);
router.use("/company-admins", companyAdminRoutes);
router.use("/company-admin-invitations", companyAdminInvitationRoutes);
router.use("/accountants", accountantRoutes);
router.use("/invitations", invitationRoutes);
router.use("/password", passwordResetRoutes);

export default router;
