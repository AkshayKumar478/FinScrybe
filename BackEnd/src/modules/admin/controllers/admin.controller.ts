import { NextFunction, Request, Response } from "express";


import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { adminService } from "../services/admin.service";

class AdminController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await adminService.login(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError("Authentication is required");
      }

      const response = await adminService.getProfile(req.user.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
