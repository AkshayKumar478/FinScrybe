import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { companyService, ICompanyService } from "../services/company.service";
import {HttpStatus } from '../../../common/constants/httpstatus'
import {ICompanyController} from './company.controller.interface' 
import { JwtMessage} from '../../../common/constants/messages'


class CompanyController implements ICompanyController {
  constructor(private readonly service: ICompanyService) {}

   async registerCompany(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> {
      try {
        const response = await this.service.registerCompany(req.body);
        res.status(HttpStatus.CREATED).json(response);
      } catch (error) {
        next(error);
      }
    }
  

  async listAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.service.listAll();
      res.status(HttpStatus.OK).json(response);
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
      const response = await this.service.listPending();
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
        throw new UnauthorizedError(JwtMessage.AUTHENTICATION_REQUIRED);
      }

      const response = await this.service.getCurrentUsersCompany(
        req.user.actorType,
        req.user.id
      );

      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.service.getById(req.params.companyId as string);
      res.status(HttpStatus.OK).json(response);
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
        throw new UnauthorizedError(JwtMessage.AUTHENTICATION_REQUIRED);
      }

      const response = await this.service.updateStatus(
        req.params.companyId as string,
        req.body.status,
        req.user.id
      );

      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const companyController = new CompanyController(companyService);
