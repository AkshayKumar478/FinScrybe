import { Router } from "express";
import { authMiddleware } from "../middlewares/adminAuthMiddleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { ActorType } from "../../../common/types";
import { adminController } from "../controllers/admin.controller";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { superAdminLoginSchema } from "../validators/admin.validation";
const adminRouter = Router();


adminRouter.post(
  "/login",
  validateMiddleware({ body: superAdminLoginSchema }),
  adminController.login.bind(adminController)
);
adminRouter.post(
  "/refresh-token",
  adminController.refreshToken.bind(adminController)
);

adminRouter.post(
  "/logout",
  adminController.logout.bind(adminController)
);

adminRouter.get(
  "/me",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  adminController.getCurrentAdmin.bind(adminController)
);
export default adminRouter;
