import { ClientSession, startSession, Types } from "mongoose";

import { ConflictError } from "../../../common/errors/ConflictError";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { AppError } from "../../../common/errors/AppError";
import { env } from "../../../config/env";
import { CompanyStatus, InvitationStatus } from "../../../common/types";
import { hashValue } from "../../../common/utils/bcrypt";
import { sendEmail } from "../../../common/utils/email";
import { generateToken } from "../../../common/utils/token";
import { companyRepository } from "../../company/repositories/company.repository";
import { companyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import {
  mapInvitationAcceptanceResponse,
  mapInvitationMessageResponse,
  mapInvitationValidationResponse,
} from "../mappers/invitation.mapper";

const INVITATION_EXPIRY_HOURS = 48;

interface InvitationBaseDocument {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  invitedBy: Types.ObjectId;
  email: string;
  token: string;
  status: InvitationStatus;
  expiresAt: Date;
}

export interface InvitationCreatePayload {
  email: string;
}

export interface InvitationAcceptPayload {
  token: string;
  fullName: string;
  password: string;
  phoneNumber: string;
}

export interface InvitationRepositoryContract<TInvitation extends InvitationBaseDocument> {
  create(payload: Partial<TInvitation>, options?: { session?: unknown }): Promise<TInvitation>;
  findById(id: string): Promise<TInvitation | null>;
  findByToken(token: string): Promise<TInvitation | null>;
  findPendingByEmailAndCompany(
    companyId: string | Types.ObjectId,
    email: string
  ): Promise<TInvitation | null>;
  refreshInvitation(
    id: string,
    token: string,
    expiresAt: Date,
    options?: { session?: unknown; new?: boolean }
  ): Promise<TInvitation | null>;
  updateStatus(
    id: string,
    status: InvitationStatus,
    acceptedAt?: Date,
    options?: { session?: unknown; new?: boolean }
  ): Promise<TInvitation | null>;
}

export interface InvitationActorConfig<TInvitation extends InvitationBaseDocument, TUser> {
  invitationLabel: string;
  createInvitationPayload(
    companyAdmin: InvitationInviter,
    payload: InvitationCreatePayload & Record<string, unknown>,
    token: string,
    expiresAt: Date
  ): Partial<TInvitation>;
  createAccount(
    invitation: TInvitation,
    payload: InvitationAcceptPayload & Record<string, unknown>,
    hashedPassword: string,
    session: ClientSession
  ): Promise<TUser>;
  findExistingUserByEmail(email: string): Promise<unknown | null>;
  invitationDetails(invitation: TInvitation): { summary: string };
}

interface InvitationInviter {
  _id: Types.ObjectId;
  companyId: Types.ObjectId;
  isActive: boolean;
}

interface InvitationInviterRepository {
  findById(id: string): Promise<InvitationInviter | null>;
}

interface ApprovedCompanyReader {
  findById(
    id: string
  ): Promise<{ status: CompanyStatus } | null>;
}

export class SharedInvitationService {
  constructor(
    private readonly inviterRepository: InvitationInviterRepository,
    private readonly companyReader: ApprovedCompanyReader
  ) {}

  async createInvitation<
    TInvitation extends InvitationBaseDocument,
    TUser
  >(
    inviterId: string,
    payload: InvitationCreatePayload & Record<string, unknown>,
    repository: InvitationRepositoryContract<TInvitation>,
    config: InvitationActorConfig<TInvitation, TUser>
  ) {
    const inviter = await this.requireInviter(inviterId);
    await this.ensureNoExistingAccount(payload.email, config.findExistingUserByEmail);

    const existingPending = await repository.findPendingByEmailAndCompany(
      inviter.companyId,
      payload.email
    );

    if (existingPending) {
      throw new ConflictError(
        `${config.invitationLabel} invitation is already pending for this email`
      );
    }

    const token = generateToken();
    const expiresAt = this.buildExpiryDate();

    const invitation = await repository.create(
      config.createInvitationPayload(inviter, payload, token, expiresAt)
    );

    await this.sendInvitationEmail(
      invitation.email,
      config.invitationLabel,
      token,
      expiresAt,
      config.invitationDetails(invitation).summary
    );

    return mapInvitationMessageResponse(
      `${config.invitationLabel} invitation sent successfully`,
      invitation
    );
  }

  async validateInvitation<TInvitation extends InvitationBaseDocument>(
    token: string,
    repository: InvitationRepositoryContract<TInvitation>,
    config: Pick<InvitationActorConfig<TInvitation, unknown>, "invitationLabel" | "invitationDetails">
  ) {
    const invitation = await this.requireValidInvitation(token, repository);

    return mapInvitationValidationResponse(
      `${config.invitationLabel} invitation is valid`,
      invitation,
      config.invitationDetails(invitation)
    );
  }

  async resendInvitation<
    TInvitation extends InvitationBaseDocument,
    TUser
  >(
    inviterId: string,
    invitationId: string,
    repository: InvitationRepositoryContract<TInvitation>,
    config: InvitationActorConfig<TInvitation, TUser>
  ) {
    const inviter = await this.requireInviter(inviterId);
    const invitation = await repository.findById(invitationId);

    if (!invitation || invitation.companyId.toString() !== inviter.companyId.toString()) {
      throw new NotFoundError(`${config.invitationLabel} invitation not found`);
    }

    if (invitation.status === InvitationStatus.ACCEPTED) {
      throw new ConflictError(`${config.invitationLabel} invitation has already been accepted`);
    }

    await this.ensureNoExistingAccount(invitation.email, config.findExistingUserByEmail);

    const token = generateToken();
    const expiresAt = this.buildExpiryDate();

    const refreshedInvitation = await repository.refreshInvitation(
      invitation._id.toString(),
      token,
      expiresAt
    );

    if (!refreshedInvitation) {
      throw new AppError(`Failed to resend ${config.invitationLabel.toLowerCase()} invitation`);
    }

    await this.sendInvitationEmail(
      refreshedInvitation.email,
      config.invitationLabel,
      token,
      expiresAt,
      config.invitationDetails(refreshedInvitation).summary
    );

    return mapInvitationMessageResponse(
      `${config.invitationLabel} invitation resent successfully`,
      refreshedInvitation
    );
  }

  async acceptInvitation<
    TInvitation extends InvitationBaseDocument,
    TUser
  >(
    payload: InvitationAcceptPayload & Record<string, unknown>,
    repository: InvitationRepositoryContract<TInvitation>,
    config: InvitationActorConfig<TInvitation, TUser>
  ) {
    const invitation = await this.requireValidInvitation(payload.token, repository);

    await this.ensureNoExistingAccount(invitation.email, config.findExistingUserByEmail);

    const hashedPassword = await hashValue(payload.password);
    const session = await startSession();

    try {
      let createdAccount: TUser | null = null;

      await session.withTransaction(async () => {
        createdAccount = await config.createAccount(
          invitation,
          payload,
          hashedPassword,
          session
        );

        await repository.updateStatus(
          invitation._id.toString(),
          InvitationStatus.ACCEPTED,
          new Date(),
          { session, new: true }
        );
      });

      return mapInvitationAcceptanceResponse(
        `${config.invitationLabel} invitation accepted successfully`,
        createdAccount
      );
    } finally {
      await session.endSession();
    }
  }

  private async requireInviter(
    inviterId: string
  ): Promise<InvitationInviter> {
    const inviter = await this.inviterRepository.findById(inviterId);

    if (!inviter) {
      throw new NotFoundError("Inviter not found");
    }

    if (!inviter.isActive) {
      throw new ForbiddenError("Inviter account is inactive");
    }

    const company = await this.companyReader.findById(
      inviter.companyId.toString()
    );

    if (!company || company.status !== CompanyStatus.APPROVED) {
      throw new ForbiddenError("Only approved companies can manage invitations");
    }

    return inviter;
  }

  private async ensureNoExistingAccount(
    email: string,
    finder: (email: string) => Promise<unknown | null>
  ): Promise<void> {
    const existingUser = await finder(email);

    if (existingUser) {
      throw new ConflictError("An account already exists for this email");
    }
  }

  private async requireValidInvitation<TInvitation extends InvitationBaseDocument>(
    token: string,
    repository: InvitationRepositoryContract<TInvitation>
  ): Promise<TInvitation> {
    const invitation = await repository.findByToken(token);

    if (!invitation) {
      throw new NotFoundError("Invitation not found");
    }

    if (invitation.status === InvitationStatus.ACCEPTED) {
      throw new ConflictError("Invitation has already been accepted");
    }

    if (invitation.status === InvitationStatus.CANCELLED) {
      throw new ConflictError("Invitation has been cancelled");
    }

    if (invitation.expiresAt.getTime() <= Date.now()) {
      await repository.updateStatus(
        invitation._id.toString(),
        InvitationStatus.EXPIRED
      );
      throw new ForbiddenError("Invitation has expired");
    }

    return invitation;
  }

  private buildExpiryDate(): Date {
    return new Date(Date.now() + INVITATION_EXPIRY_HOURS * 60 * 60 * 1000);
  }

  private async sendInvitationEmail(
    to: string,
    invitationLabel: string,
    token: string,
    expiresAt: Date,
    summary: string
  ): Promise<void> {
    const invitationLink = `${env.CLIENT_URL}/accept-invitation?token=${token}`;

    await sendEmail(
      to,
      `${invitationLabel} invitation`,
      `
        <p>You have received a ${invitationLabel.toLowerCase()} invitation.</p>
        <p>${summary}</p>
        <p>This invitation expires on ${expiresAt.toISOString()}.</p>
        <p><a href="${invitationLink}">Accept invitation</a></p>
      `
    );
  }
}

export const sharedInvitationService = new SharedInvitationService(
  companyAdminRepository,
  companyRepository
);
