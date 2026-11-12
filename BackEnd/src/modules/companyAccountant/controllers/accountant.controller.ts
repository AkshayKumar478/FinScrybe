import type { Request, Response } from "express";

import { HttpStatus } from "../../../common/constants/httpstatus";
import { accountantService } from "../services/accountant.service";
import type { IAccountantService } from "../services/accountant.service.interface";
import type { IAccountantController } from "./accountant.controller.interface";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { AccountantMessage } from "../../../common/constants/messages";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../../common/utils/cookies";

import type {
  AcceptInvitationInput,
  AccountantLoginInput,
} from "../validators/accountant.validation";

class AccountantController implements IAccountantController {
  constructor(private readonly service: IAccountantService) {}

    async acceptInvitation(req: Request,res: Response): Promise<void> {
    const payload: AcceptInvitationInput = req.body;

    const accountant = await this.service.acceptInvitation(payload);

    res.status(HttpStatus.CREATED).json(accountant);
  }

  async login(req: Request, res: Response): Promise<void> {
    const payload: AccountantLoginInput = req.body;

    const result = await this.service.login(payload);

    res.cookie(
      "accessToken",
      result.accessToken,
      accessTokenCookieOptions
    );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      refreshTokenCookieOptions
    );

    res.status(HttpStatus.OK).json(result.accountant);
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("accessToken", accessTokenCookieOptions);
    res.clearCookie("refreshToken", refreshTokenCookieOptions);

    res.status(HttpStatus.OK).json({
      message: "Logged out successfully",
    });
  }
  async listMyCompany(req: Request, res: Response): Promise<void> {
  const companyId = req.user?.companyId;

  if (!companyId) {
    throw new UnauthorizedError(AccountantMessage.ACCOUNTANT_COMPANY_NOT_LINKED);
  }

  const accountants = await this.service.listMyCompany(companyId);

  res.status(HttpStatus.OK).json(accountants);
}
}

export const accountantController = new AccountantController(
  accountantService
);