import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { accountantService } from "../services/accountant.service";

class AccountantController {
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await accountantService.getProfile(req.user.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async listMyCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id || !req.user.actorType) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await accountantService.listForCurrentCompany(
        req.user.actorType,
        req.user.id
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async listByCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id || !req.user.actorType) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await accountantService.listByCompanyForActor(
        req.user.actorType,
        req.user.id,
        req.params.companyId as string
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id || !req.user.actorType) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await accountantService.updateStatus(
        req.user.actorType,
        req.user.id,
        req.params.accountantId as string,
        req.body.isActive
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const accountantController = new AccountantController();
