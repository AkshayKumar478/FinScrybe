import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { ActorType } from "../../../common/types";
import { companyAdminInvitationController } from "../controllers/companyAdminInvitation.controller";
import {
  acceptCompanyAdminInvitationSchema,
  createCompanyAdminInvitationSchema,
  resendCompanyAdminInvitationParamsSchema,
  validateCompanyAdminInvitationQuerySchema,
} from "../validators/companyAdminInvitation.validation";

const companyAdminInvitationRouter = Router();

companyAdminInvitationRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ body: createCompanyAdminInvitationSchema }),
  companyAdminInvitationController.createInvitation.bind(
    companyAdminInvitationController
  )
);

companyAdminInvitationRouter.get(
  "/validate",
  validateMiddleware({ query: validateCompanyAdminInvitationQuerySchema }),
  companyAdminInvitationController.validateInvitation.bind(
    companyAdminInvitationController
  )
);

companyAdminInvitationRouter.post(
  "/:invitationId/resend",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ params: resendCompanyAdminInvitationParamsSchema }),
  companyAdminInvitationController.resendInvitation.bind(
    companyAdminInvitationController
  )
);

companyAdminInvitationRouter.post(
  "/accept",
  validateMiddleware({ body: acceptCompanyAdminInvitationSchema }),
  companyAdminInvitationController.acceptInvitation.bind(
    companyAdminInvitationController
  )
);

export default companyAdminInvitationRouter;
