import { Router } from "express";

import { accountantController } from "../controllers/accountant.controller";

import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { authMiddleware } from "../../admin/middlewares/adminAuthMiddleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { ActorType } from "../../../common/types";

import {
  acceptInvitationSchema,
  accountantLoginSchema,
} from "../validators/accountant.validation";

const accountantRouter = Router();
accountantRouter.get(
  "/my-company",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  accountantController.listMyCompany.bind(accountantController)
);

accountantRouter.post(
  "/accept-invitation",
  validateMiddleware({ body: acceptInvitationSchema }),
  accountantController.acceptInvitation.bind(accountantController)
);

accountantRouter.post(
  "/login",
  validateMiddleware({ body: accountantLoginSchema }),
  accountantController.login.bind(accountantController)
);

accountantRouter.post(
  "/logout",
  accountantController.logout.bind(accountantController)
);

export default accountantRouter;