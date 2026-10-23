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
  "/invitation",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ body: createInvitationSchema }),
);

invitationRouter.get(
  "/invitation/validate",
  validateMiddleware({ query: validateInvitationQuerySchema }),
);

invitationRouter.post(
  "/:invitationId/resend",
  authMiddleware,
  roleMiddleware(ActorType.COMPANY_ADMIN),
  validateMiddleware({ params: resendInvitationParamsSchema }),
);

invitationRouter.post(
  "/accept",
  validateMiddleware({ body: acceptInvitationSchema }),
);

export default invitationRouter;
