import type { Request, Response } from "express";

export interface IAccountantController {
  acceptInvitation(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
}