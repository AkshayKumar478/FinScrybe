import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { companyService } from "../services/company.service";


class CompanyController {
   async registerCompany(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const response = await companyService.registerCompany(req.body);
        res.status(201).json(response);
      } catch (error) {
        next(error);
      }
    }
  

  async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await companyService.listAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async listPending(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await companyService.listPending();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id || !req.user.actorType) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await companyService.getCurrentUsersCompany(
        req.user.actorType,
        req.user.id
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await companyService.getById(req.params.companyId as string);
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
      if (!req.user?.id) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await companyService.updateStatus(
        req.params.companyId as string,
        req.body.status,
        req.user.id
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const companyController = new CompanyController();
