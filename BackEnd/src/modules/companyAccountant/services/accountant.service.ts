import mongoose from "mongoose";

import { ActorType, InvitationStatus } from "../../../common/types";
import { AccountantMessage, InvitationMessages } from "../../../common/constants/messages";

import { ConflictError } from "../../../common/errors/ConflictError";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";

import { hashValue, compareValue } from "../../../common/utils/bcrypt";
import normalizeEmail from "../../../common/utils/emailNormalize";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../common/utils/jwt";

import type { IAccountant } from "../model/accountant.model.interface";

import type { IAccountantRepository } from "../repositories/accountant.repository.interface";
import { accountantRepository } from "../repositories/accountant.repository";

import type { IInvitationRepository } from "../../companyAccountantInvitation/repositories/invitation.repository.interface";
import { invitationRepository } from "../../companyAccountantInvitation/repositories/invitation.repository";

import { mapAccountantAccount } from "../mappers/accountant.mapper";
import { AccountantDto } from "../mappers/accountant.mapper.interfaces";
import { mapAccountantProfiles } from "../mappers/accountant.mapper";

import type {
  AccountantAccountResponse,
  AccountantLoginServiceResponse,
} from "../mappers/accountant.mapper.interfaces";

import type {
  AcceptInvitationInput,
  AccountantLoginInput,
} from "../validators/accountant.validation";

import type { IAccountantService } from "./accountant.service.interface";

class AccountantService implements IAccountantService {
  constructor(
    private readonly accountantRepo: IAccountantRepository,
    private readonly invitationRepo: IInvitationRepository
  ) {}

  async acceptInvitation(
    payload: AcceptInvitationInput
  ): Promise<AccountantAccountResponse> {
    const invitation = await this.invitationRepo.findById(
      payload.invitationId
    );

    const acceptedAt = new Date();

    if (
      !invitation ||
      invitation.status !== InvitationStatus.PENDING ||
      invitation.expiresAt.getTime() <= acceptedAt.getTime()
    ) {
      throw new ConflictError(
        InvitationMessages.INVALID_OR_EXPIRED_INVITATION
      );
    }

    const isValidToken = await compareValue(
      payload.token,
      invitation.token
    );

    if (!isValidToken) {
      throw new UnauthorizedError(
        InvitationMessages.iNVALID_INVITATION_tOKEN
      );
    }

    const email = normalizeEmail(invitation.email);

    const existingAccountant = await this.accountantRepo.findByEmail(email);

    if (existingAccountant) {
      throw new ConflictError(
        AccountantMessage.ACCOUNTANT_ALREADY_EXISTS
      );
    }

    const hashedPassword = await hashValue(payload.password);
    const session = await mongoose.startSession();

    let createdAccountant: IAccountant | null = null;

    await session
      .withTransaction(async () => {
        createdAccountant = await this.accountantRepo.create(
          {
            companyId: invitation.companyId,
            email,
            fullName: payload.fullName,
            password: hashedPassword,
            phoneNumber: payload.phoneNumber,
            department: invitation.department,
          },
          { session }
        );

        const acceptedInvitation =
          await this.invitationRepo.acceptInvitation(
            payload.invitationId,
            invitation.token,
            acceptedAt,
            session
          );

        if (!acceptedInvitation) {
          throw new ConflictError(
            InvitationMessages.INVALID_OR_EXPIRED_INVITATION
          );
        }
      })
      .finally(() => session.endSession());

    if (!createdAccountant) {
      throw new ConflictError("Accountant account creation failed");
    }

    return mapAccountantAccount(createdAccountant);
  }

  async login(
  payload: AccountantLoginInput
): Promise<AccountantLoginServiceResponse>  {
    const email = normalizeEmail(payload.email);

    const accountant =
      await this.accountantRepo.findByEmailWithPassword(email);

    if (!accountant) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await compareValue(
      payload.password,
      accountant.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!accountant.isActive) {
      throw new UnauthorizedError("Your account is inactive");
    }

    const tokenPayload = {
      id: accountant._id.toString(),
      actorType: ActorType.ACCOUNTANT,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await this.accountantRepo.updateLastLogin(
      accountant._id.toString(),
      new Date()
    );

    return {
      accountant: mapAccountantAccount(accountant),
      accessToken,
      refreshToken,
    };
  }
  async listMyCompany(companyId: string): Promise<AccountantDto[]> {
  const accountants = await this.accountantRepo.findByCompanyId(companyId);
  return mapAccountantProfiles(accountants);
}

}

export const accountantService = new AccountantService(
  accountantRepository,
  invitationRepository
);