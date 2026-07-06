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
  validateInvitationQuerySchema,
} from "../validators/invitation.validation";

const invitationRouter = Router();

invitationRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ body: createInvitationSchema }),
  invitationController.createInvitation.bind(invitationController)
);

invitationRouter.get(
  "/validate",
  validateMiddleware({ query: validateInvitationQuerySchema }),
  invitationController.validateInvitation.bind(invitationController)
);

invitationRouter.post(
  "/:invitationId/resend",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ params: resendInvitationParamsSchema }),
  invitationController.resendInvitation.bind(invitationController)
);

invitationRouter.post(
  "/accept",
  validateMiddleware({ body: acceptInvitationSchema }),
  invitationController.acceptInvitation.bind(invitationController)
);

export default invitationRouter;
