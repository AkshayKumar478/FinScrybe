import { Request, Response } from "express";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../../common/utils/cookies";
import {
  companyAdminService,
} from "../services/companyAdmin.service";
import { ICompanyAdminController } from "./companyAdmin.controller.interface";
import { ICompanyAdminService } from "../services/companyAdmin.service";
import { HttpStatus } from "../../../common/constants/httpstatus";



class CompanyAdminController implements ICompanyAdminController {
  constructor(private readonly service: ICompanyAdminService) {}

  async login(req: Request, res: Response,): Promise<void> {
   
      const response = await this.service.login(req.body);

      res
        .cookie("accessToken", response.accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", response.refreshToken, refreshTokenCookieOptions)
        .status(HttpStatus.OK)
        .json({ message: response.message, user: response.user });
  
  }

  async logout(_req: Request, res: Response): Promise<void> {
   
      res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({
        message: "Logout successful",
      });
    
  }
}

export const companyAdminController = new CompanyAdminController(companyAdminService);
