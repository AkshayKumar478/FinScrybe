import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { companyAdminService } from "../services/companyAdmin.service";

class CompanyAdminController {
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await companyAdminService.getProfile(req.user.id);
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

      const response = await companyAdminService.listForCurrentCompany(
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
      const response = await companyAdminService.listByCompany(req.params.companyId as string);
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

      const response = await companyAdminService.updateStatus(
        req.user.actorType,
        req.user.id,
        req.params.companyAdminId as string,
        req.body.isActive
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const companyAdminController = new CompanyAdminController();
