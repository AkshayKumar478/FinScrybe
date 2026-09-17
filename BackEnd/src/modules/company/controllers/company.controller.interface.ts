import { NextFunction, Request, Response } from "express";

export interface ICompanyController {
  registerCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  listAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  listPending(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getCurrentCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}