import { NextFunction, Request, Response } from "express";

export default interface IAdminController{
  login(req: Request, res: Response, next: NextFunction): Promise<void>
    refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getCurrentAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}