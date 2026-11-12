import { Request, Response } from "express";

export interface ICompanyController {
  startRegistration(req: Request, res: Response): Promise<void>;
  resendRegistrationOtp(req: Request, res: Response): Promise<void>;
  verifyRegistrationOtp(req: Request, res: Response): Promise<void>;
  completeRegistration(req: Request, res: Response): Promise<void>;


  listAll(req: Request, res: Response): Promise<void>;
  getCurrentCompany(
    req: Request,
    res: Response
  ): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
}
