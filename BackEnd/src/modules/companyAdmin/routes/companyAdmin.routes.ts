import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { ActorType } from "../../../common/types";
import { companyAdminController } from "../controllers/companyAdmin.controller";
import {
  companyAdminIdParamsSchema,
  companyIdParamsSchema,
  updateCompanyAdminStatusSchema,
} from "../validators/companyAdmin.validation";

const companyAdminRouter = Router();

companyAdminRouter.get(
  "/me",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  companyAdminController.getProfile.bind(companyAdminController)
);

companyAdminRouter.get(
  "/my-company",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  companyAdminController.listMyCompany.bind(companyAdminController)
);

companyAdminRouter.get(
  "/company/:companyId",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  validateMiddleware({ params: companyIdParamsSchema }),
  companyAdminController.listByCompany.bind(companyAdminController)
);

companyAdminRouter.patch(
  "/:companyAdminId/status",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN, ActorType.COMPANY_ADMIN),
  validateMiddleware({
    params: companyAdminIdParamsSchema,
    body: updateCompanyAdminStatusSchema,
  }),
  companyAdminController.updateStatus.bind(companyAdminController)
);

export default companyAdminRouter;
