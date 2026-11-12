import { Request,Response } from "express";
export interface ICompanyAdminController {
  login(req: Request, res: Response, ): Promise<void>;
  logout(req: Request, res: Response,): Promise<void>;
}