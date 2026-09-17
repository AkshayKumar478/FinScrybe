import { NextFunction, Request, Response } from "express";
import { HttpStatus }from '../../../common/constants/httpstatus'
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { adminService } from "../services/admin.service";
import {IAdminService} from '../services/admin.service.interface'
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../../common/utils/cookies";
import IAdminController from './admin.controller.Interface'
import {SuperAdminMessage,JwtMessage} from '../../../common/constants/messages'
import { jwt } from "zod";
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
      .status(HttpStatus.OK)
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
      throw new UnauthorizedError(JwtMessage.REFRESH_TOKEN_REQUIRED);
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
      .status(HttpStatus.OK)
      .json({
        message: JwtMessage.Token_REFRESHED,
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
        message: SuperAdminMessage.LOGOUT_SUCCESS,
      });
  } catch (error) {
    next(error);
  }
}

  async getCurrentAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new UnauthorizedError(JwtMessage.AUTHENTICATION_REQUIRED);
      }

      const user = await this.adminService.getCurrentAdmin(req.user.id);
      res.status(HttpStatus.OK).json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController(adminService);
