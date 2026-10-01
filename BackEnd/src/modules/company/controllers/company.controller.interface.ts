import { NextFunction, Request, Response } from "express";

export interface ICompanyController {
  startRegistration(req: Request, res: Response, next: NextFunction): Promise<void>;
   resendRegistrationOtp(req:Request,res:Response,next:NextFunction):Promise<void>;
  verifyRegistrationOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  completeRegistration(req: Request, res: Response, next: NextFunction): Promise<void>;


  listAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getCurrentCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
