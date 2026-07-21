import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { ActorType } from "../../../common/types";
import { companyRegistrationSchema } from "../validators/company.validation";
import { companyController } from "../controllers/company.controller";
import {
  companyIdParamsSchema,
  updateCompanyStatusSchema,
} from "../validators/company.validation";

const companyRouter = Router();
companyRouter.post(
  "/register",
  validateMiddleware({ body: companyRegistrationSchema }),
  companyController.registerCompany.bind(companyController)
);


companyRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  companyController.listAll.bind(companyController)
);

companyRouter.get(
  "/pending",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  companyController.listPending.bind(companyController)
);



companyRouter.get(
  "/:companyId",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  validateMiddleware({ params: companyIdParamsSchema }),
  companyController.getById.bind(companyController)
);

companyRouter.patch(
  "/:companyId/status",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  validateMiddleware({
    params: companyIdParamsSchema,
    body: updateCompanyStatusSchema,
  }),
  companyController.updateStatus.bind(companyController)
);

export default companyRouter;
