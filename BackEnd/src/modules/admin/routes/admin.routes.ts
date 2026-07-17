import { Router } from "express";
import { authMiddleware } from "../middlewares/adminAuthMiddleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { ActorType } from "../../../common/types";
import { adminController } from "../controllers/admin.controller";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { superAdminLoginSchema } from "../validators/admin.validation";
const adminRouter = Router();

adminRouter.get(
  "/me",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  adminController.getProfile.bind(adminController)
);
adminRouter.post(
  "/login",
  validateMiddleware({ body: superAdminLoginSchema }),
  adminController.login.bind(adminController)
);
export default adminRouter;
