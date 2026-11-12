import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { ActorType } from "../../../common/types";
import { invitationController } from "../controllers/invitation.controller";
import {
  acceptInvitationSchema,
  createInvitationSchema,
  resendInvitationParamsSchema,
  validateInvitationParamsSchema,
  validateInvitationQuerySchema,
} from "../validators/invitation.validation";

const invitationRouter = Router();

invitationRouter.post(
  "/invitation",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ body: createInvitationSchema }),
  invitationController.createAccountantInvitation.bind(invitationController)
);

invitationRouter.post(
  "/:invitationId/resend",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ params: resendInvitationParamsSchema }),
  invitationController.resendInvitation.bind(invitationController)
);

invitationRouter.delete(
  "/invitation/:invitationId",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ params: resendInvitationParamsSchema }),
  invitationController.cancelInvitation.bind(invitationController)
);

invitationRouter.get(
  "/invitation/:invitationId/validate",
  validateMiddleware({
    params: validateInvitationParamsSchema,
    query: validateInvitationQuerySchema,
  }),
  invitationController.validateInvitation.bind(invitationController)
);

invitationRouter.get(
  "/invitations",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  invitationController.listCompanyInvitations.bind(invitationController)
);

export default invitationRouter;