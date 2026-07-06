import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { invitationService } from "../services/invitation.service";

class InvitationController {
  async createInvitation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await invitationService.createInvitation(
        req.user.id,
        req.body
      );

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async validateInvitation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await invitationService.validateInvitation(
        req.query.token as string
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async resendInvitation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await invitationService.resendInvitation(
        req.user.id,
        req.params.invitationId as string
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async acceptInvitation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await invitationService.acceptInvitation(req.body);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const invitationController = new InvitationController();
