import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";

export class AuthController {
  async loginSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await authService.loginSuperAdmin(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async registerCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await authService.registerCompany(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async loginCompanyAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await authService.loginCompanyAdmin(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async loginAccountant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await authService.loginAccountant(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
