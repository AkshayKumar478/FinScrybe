import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { env } from "../../../config/env";
import { ActorType } from "../../../common/types";
import { hashValue } from "../../../common/utils/bcrypt";
import { sendEmail } from "../../../common/utils/email";
import { generateToken } from "../../../common/utils/token";
import { authRepository } from "../../auth/repositories/auth.repository";
import { IPasswordResetActorRepository } from "../../auth/auth.contracts";
import {
  mapForgotPasswordResponse,
  mapResetPasswordResponse,
} from "../mappers/passwordReset.mapper";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../validators/passwordReset.validation";
import {
  IPasswordResetRepository,
  passwordResetRepository,
} from "../repositories/passwordReset.repository";

const PASSWORD_RESET_EXPIRY_MS = 1000 * 60 * 30;

class PasswordResetService {
  constructor(
    private readonly repository: IPasswordResetRepository,
    private readonly authRepo: IPasswordResetActorRepository
  ) {}

  async forgotPassword(payload: ForgotPasswordInput) {
    const actor = await this.authRepo.findActorByEmail(
      payload.actorType,
      payload.email
    );

    if (!actor) {
      throw new NotFoundError("User not found");
    }

    if (!("isActive" in actor) || !actor.isActive) {
      throw new ForbiddenError("Account is inactive");
    }

    await this.repository.invalidateUserTokens(
      actor._id.toString(),
      payload.actorType
    );

    const token = generateToken();
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);

    await this.repository.create({
      userId: actor._id,
      userType: payload.actorType,
      token,
      expiresAt,
      isUsed: false,
    });

    await this.sendResetEmail(payload.email, payload.actorType, token, expiresAt);

    return mapForgotPasswordResponse();
  }

  async resetPassword(payload: ResetPasswordInput) {
    const passwordReset = await this.repository.findByToken(payload.token);

    if (!passwordReset) {
      throw new NotFoundError("Reset token not found");
    }

    if (passwordReset.isUsed) {
      throw new UnauthorizedError("Reset token has already been used");
    }

    if (passwordReset.expiresAt.getTime() <= Date.now()) {
      throw new UnauthorizedError("Reset token has expired");
    }

    const hashedPassword = await hashValue(payload.password);

    const updatedActor = await this.authRepo.updateActorPassword(
      passwordReset.userType,
      passwordReset.userId.toString(),
      hashedPassword
    );

    if (!updatedActor) {
      throw new NotFoundError("User not found");
    }

    await this.repository.markAsUsed(payload.token);
    await this.repository.invalidateUserTokens(
      passwordReset.userId.toString(),
      passwordReset.userType
    );

    return mapResetPasswordResponse(passwordReset.userType);
  }

  private async sendResetEmail(
    email: string,
    actorType: ActorType,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    const resetLink = `${env.CLIENT_URL}/reset-password?token=${token}&actorType=${actorType}`;

    await sendEmail(
      email,
      "Reset your FinScrybe password",
      `
        <p>We received a request to reset your password.</p>
        <p>This reset link is for your ${actorType.toLowerCase().replace("_", " ")} account.</p>
        <p><a href="${resetLink}">Reset password</a></p>
        <p>This link expires on ${expiresAt.toISOString()}.</p>
      `
    );
  }
}

export const passwordResetService = new PasswordResetService(
  passwordResetRepository,
  authRepository
);
