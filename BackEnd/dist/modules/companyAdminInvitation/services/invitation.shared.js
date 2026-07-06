"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedInvitationService = exports.SharedInvitationService = void 0;
const mongoose_1 = require("mongoose");
const ConflictError_1 = require("../../../common/errors/ConflictError");
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const AppError_1 = require("../../../common/errors/AppError");
const env_1 = require("../../../config/env");
const types_1 = require("../../../common/types");
const bcrypt_1 = require("../../../common/utils/bcrypt");
const email_1 = require("../../../common/utils/email");
const token_1 = require("../../../common/utils/token");
const company_repository_1 = require("../../company/repositories/company.repository");
const companyAdmin_repository_1 = require("../../companyAdmin/repositories/companyAdmin.repository");
const INVITATION_EXPIRY_HOURS = 48;
class SharedInvitationService {
    constructor(inviterRepository, companyReader) {
        this.inviterRepository = inviterRepository;
        this.companyReader = companyReader;
    }
    async createInvitation(inviterId, payload, repository, config) {
        const inviter = await this.requireInviter(inviterId);
        await this.ensureNoExistingAccount(payload.email, config.findExistingUserByEmail);
        const existingPending = await repository.findPendingByEmailAndCompany(inviter.companyId, payload.email);
        if (existingPending) {
            throw new ConflictError_1.ConflictError(`${config.invitationLabel} invitation is already pending for this email`);
        }
        const token = (0, token_1.generateToken)();
        const expiresAt = this.buildExpiryDate();
        const invitation = await repository.create(config.createInvitationPayload(inviter, payload, token, expiresAt));
        await this.sendInvitationEmail(invitation.email, config.invitationLabel, token, expiresAt, config.invitationDetails(invitation).summary);
        return {
            message: `${config.invitationLabel} invitation sent successfully`,
            invitation: this.formatInvitation(invitation),
        };
    }
    async validateInvitation(token, repository, config) {
        const invitation = await this.requireValidInvitation(token, repository);
        return {
            message: `${config.invitationLabel} invitation is valid`,
            invitation: this.formatInvitation(invitation),
            details: config.invitationDetails(invitation),
        };
    }
    async resendInvitation(inviterId, invitationId, repository, config) {
        const inviter = await this.requireInviter(inviterId);
        const invitation = await repository.findById(invitationId);
        if (!invitation || invitation.companyId.toString() !== inviter.companyId.toString()) {
            throw new NotFoundError_1.NotFoundError(`${config.invitationLabel} invitation not found`);
        }
        if (invitation.status === types_1.InvitationStatus.ACCEPTED) {
            throw new ConflictError_1.ConflictError(`${config.invitationLabel} invitation has already been accepted`);
        }
        await this.ensureNoExistingAccount(invitation.email, config.findExistingUserByEmail);
        const token = (0, token_1.generateToken)();
        const expiresAt = this.buildExpiryDate();
        const refreshedInvitation = await repository.refreshInvitation(invitation._id.toString(), token, expiresAt);
        if (!refreshedInvitation) {
            throw new AppError_1.AppError(`Failed to resend ${config.invitationLabel.toLowerCase()} invitation`);
        }
        await this.sendInvitationEmail(refreshedInvitation.email, config.invitationLabel, token, expiresAt, config.invitationDetails(refreshedInvitation).summary);
        return {
            message: `${config.invitationLabel} invitation resent successfully`,
            invitation: this.formatInvitation(refreshedInvitation),
        };
    }
    async acceptInvitation(payload, repository, config) {
        const invitation = await this.requireValidInvitation(payload.token, repository);
        await this.ensureNoExistingAccount(invitation.email, config.findExistingUserByEmail);
        const hashedPassword = await (0, bcrypt_1.hashValue)(payload.password);
        const session = await (0, mongoose_1.startSession)();
        try {
            let createdAccount = null;
            await session.withTransaction(async () => {
                createdAccount = await config.createAccount(invitation, payload, hashedPassword, session);
                await repository.updateStatus(invitation._id.toString(), types_1.InvitationStatus.ACCEPTED, new Date(), { session, new: true });
            });
            return {
                message: `${config.invitationLabel} invitation accepted successfully`,
                account: createdAccount,
            };
        }
        finally {
            await session.endSession();
        }
    }
    async requireInviter(inviterId) {
        const inviter = await this.inviterRepository.findById(inviterId);
        if (!inviter) {
            throw new NotFoundError_1.NotFoundError("Inviter not found");
        }
        if (!inviter.isActive) {
            throw new ForbiddenError_1.ForbiddenError("Inviter account is inactive");
        }
        const company = await this.companyReader.findById(inviter.companyId.toString());
        if (!company || company.status !== types_1.CompanyStatus.APPROVED) {
            throw new ForbiddenError_1.ForbiddenError("Only approved companies can manage invitations");
        }
        return inviter;
    }
    async ensureNoExistingAccount(email, finder) {
        const existingUser = await finder(email);
        if (existingUser) {
            throw new ConflictError_1.ConflictError("An account already exists for this email");
        }
    }
    async requireValidInvitation(token, repository) {
        const invitation = await repository.findByToken(token);
        if (!invitation) {
            throw new NotFoundError_1.NotFoundError("Invitation not found");
        }
        if (invitation.status === types_1.InvitationStatus.ACCEPTED) {
            throw new ConflictError_1.ConflictError("Invitation has already been accepted");
        }
        if (invitation.status === types_1.InvitationStatus.CANCELLED) {
            throw new ConflictError_1.ConflictError("Invitation has been cancelled");
        }
        if (invitation.expiresAt.getTime() <= Date.now()) {
            await repository.updateStatus(invitation._id.toString(), types_1.InvitationStatus.EXPIRED);
            throw new ForbiddenError_1.ForbiddenError("Invitation has expired");
        }
        return invitation;
    }
    buildExpiryDate() {
        return new Date(Date.now() + INVITATION_EXPIRY_HOURS * 60 * 60 * 1000);
    }
    async sendInvitationEmail(to, invitationLabel, token, expiresAt, summary) {
        const invitationLink = `${env_1.env.CLIENT_URL}/accept-invitation?token=${token}`;
        await (0, email_1.sendEmail)(to, `${invitationLabel} invitation`, `
        <p>You have received a ${invitationLabel.toLowerCase()} invitation.</p>
        <p>${summary}</p>
        <p>This invitation expires on ${expiresAt.toISOString()}.</p>
        <p><a href="${invitationLink}">Accept invitation</a></p>
      `);
    }
    formatInvitation(invitation) {
        return {
            id: invitation._id.toString(),
            email: invitation.email,
            status: invitation.status,
            expiresAt: invitation.expiresAt,
        };
    }
}
exports.SharedInvitationService = SharedInvitationService;
exports.sharedInvitationService = new SharedInvitationService(companyAdmin_repository_1.companyAdminRepository, company_repository_1.companyRepository);
