import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { ActorType } from "../../../common/types";
import { accountantController } from "../controllers/accountant.controller";
import {
  accountantIdParamsSchema,
  companyIdParamsSchema,
  updateAccountantStatusSchema,
} from "../validators/accountant.validation";

const accountantRouter = Router();

accountantRouter.get(
  "/me",
  authMiddleware,
  roleMiddleware(ActorType.ACCOUNTANT),
  accountantController.getProfile.bind(accountantController)
);

accountantRouter.get(
  "/my-company",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  accountantController.listMyCompany.bind(accountantController)
);

accountantRouter.get(
  "/company/:companyId",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN, ActorType.COMPANY_ADMIN),
  validateMiddleware({ params: companyIdParamsSchema }),
  accountantController.listByCompany.bind(accountantController)
);

accountantRouter.patch(
  "/:accountantId/status",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN, ActorType.COMPANY_ADMIN),
  validateMiddleware({
    params: accountantIdParamsSchema,
    body: updateAccountantStatusSchema,
  }),
  accountantController.updateStatus.bind(accountantController)
);

export default accountantRouter;
