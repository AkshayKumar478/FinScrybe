import { NextFunction, Request, Response } from "express";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../../common/utils/cookies";
import {
  companyAdminService,
  ICompanyAdminService,
} from "../services/companyAdmin.service";

export interface ICompanyAdminController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class CompanyAdminController implements ICompanyAdminController {
  constructor(private readonly service: ICompanyAdminService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.service.login(req.body);

      res
        .cookie("accessToken", response.accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", response.refreshToken, refreshTokenCookieOptions)
        .status(200)
        .json({ message: response.message, user: response.user });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const companyAdminController = new CompanyAdminController(companyAdminService);
