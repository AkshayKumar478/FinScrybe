import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { invitationService } from "../services/invitation.service";

class InvitationController {
  
}

export const invitationController = new InvitationController();
