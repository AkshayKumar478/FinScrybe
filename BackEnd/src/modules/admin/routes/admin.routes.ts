import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { ActorType } from "../../../common/types";
import { adminController } from "../controllers/admin.controller";

const adminRouter = Router();

adminRouter.get(
  "/me",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  adminController.getProfile.bind(adminController)
);

export default adminRouter;
