import { NextFunction, Request, Response } from "express";

export default interface IAdminController{
  login(req: Request, res: Response): Promise<void>
    refreshToken(
    req: Request,
    res: Response,
  ): Promise<void>;

  logout(
    req: Request,
    res: Response,

  ): Promise<void>;
  getCurrentAdmin(
    req: Request,
    res: Response,
  ): Promise<void>;
}