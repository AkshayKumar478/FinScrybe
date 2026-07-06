"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetService = void 0;
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const env_1 = require("../../../config/env");
const bcrypt_1 = require("../../../common/utils/bcrypt");
const email_1 = require("../../../common/utils/email");
const token_1 = require("../../../common/utils/token");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
const passwordReset_repository_1 = require("../repositories/passwordReset.repository");
const PASSWORD_RESET_EXPIRY_MS = 1000 * 60 * 30;
class PasswordResetService {
    constructor(repository, authRepo) {
        this.repository = repository;
        this.authRepo = authRepo;
    }
    async forgotPassword(payload) {
        const actor = await this.authRepo.findActorByEmail(payload.actorType, payload.email);
        if (!actor) {
            throw new NotFoundError_1.NotFoundError("User not found");
        }
        if (!("isActive" in actor) || !actor.isActive) {
            throw new ForbiddenError_1.ForbiddenError("Account is inactive");
        }
        await this.repository.invalidateUserTokens(actor._id.toString(), payload.actorType);
        const token = (0, token_1.generateToken)();
        const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);
        await this.repository.create({
            userId: actor._id,
            userType: payload.actorType,
            token,
            expiresAt,
            isUsed: false,
        });
        await this.sendResetEmail(payload.email, payload.actorType, token, expiresAt);
        return {
            message: "Password reset email sent successfully",
        };
    }
    async resetPassword(payload) {
        const passwordReset = await this.repository.findByToken(payload.token);
        if (!passwordReset) {
            throw new NotFoundError_1.NotFoundError("Reset token not found");
        }
        if (passwordReset.isUsed) {
            throw new UnauthorizedError_1.UnauthorizedError("Reset token has already been used");
        }
        if (passwordReset.expiresAt.getTime() <= Date.now()) {
            throw new UnauthorizedError_1.UnauthorizedError("Reset token has expired");
        }
        const hashedPassword = await (0, bcrypt_1.hashValue)(payload.password);
        const updatedActor = await this.authRepo.updateActorPassword(passwordReset.userType, passwordReset.userId.toString(), hashedPassword);
        if (!updatedActor) {
            throw new NotFoundError_1.NotFoundError("User not found");
        }
        await this.repository.markAsUsed(payload.token);
        await this.repository.invalidateUserTokens(passwordReset.userId.toString(), passwordReset.userType);
        return {
            message: "Password reset successful",
            actorType: passwordReset.userType,
        };
    }
    async sendResetEmail(email, actorType, token, expiresAt) {
        const resetLink = `${env_1.env.CLIENT_URL}/reset-password?token=${token}&actorType=${actorType}`;
        await (0, email_1.sendEmail)(email, "Reset your FinScrybe password", `
        <p>We received a request to reset your password.</p>
        <p>This reset link is for your ${actorType.toLowerCase().replace("_", " ")} account.</p>
        <p><a href="${resetLink}">Reset password</a></p>
        <p>This link expires on ${expiresAt.toISOString()}.</p>
      `);
    }
}
exports.passwordResetService = new PasswordResetService(passwordReset_repository_1.passwordResetRepository, auth_repository_1.authRepository);
