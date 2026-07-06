import { NextFunction, Request, Response } from "express";

import { passwordResetService } from "../services/passwordReset.service";

class PasswordResetController {
  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await passwordResetService.forgotPassword(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await passwordResetService.resetPassword(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const passwordResetController = new PasswordResetController();
