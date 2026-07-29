import { NextFunction, Request, Response } from "express";


import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { adminService, IAdminService } from "../services/admin.service";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../../common/utils/cookies";

interface IAdminController{
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
}
class AdminController implements IAdminController {
  constructor(private readonly adminService: IAdminService) { 

  }
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.adminService.login(req.body)
     res.cookie(
        "accessToken",
        response.accessToken,
        accessTokenCookieOptions
      )
      .cookie(
        "refreshToken",
        response.refreshToken,
        refreshTokenCookieOptions
      )
      .status(200)
      .json({
        message: response.message,
        user: response.user,
      });

    } catch (error) {
      next(error);
    }
  }

 async refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token is required");
    }

    const tokens = await this.adminService.refreshToken(refreshToken);

    res
      .cookie(
        "accessToken",
        tokens.accessToken,
        accessTokenCookieOptions
      )
      .cookie(
        "refreshToken",
        tokens.refreshToken,
        refreshTokenCookieOptions
      )
      .status(200)
      .json({
        message: "Token refreshed",
      });
  } catch (error) {
    next(error);
  }
 }
  async logout(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        message: "Logout successful",
      });
  } catch (error) {
    next(error);
  }
}
}

export const adminController = new AdminController(adminService);
