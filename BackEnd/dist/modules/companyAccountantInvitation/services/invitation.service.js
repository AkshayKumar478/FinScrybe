"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationService = void 0;
const types_1 = require("../../../common/types");
const accountant_repository_1 = require("../../companyAccountant/repositories/accountant.repository");
const invitation_shared_1 = require("../../companyAdminInvitation/services/invitation.shared");
const invitation_repository_1 = require("../repositories/invitation.repository");
class InvitationService {
    constructor(repository) {
        this.repository = repository;
    }
    async createInvitation(inviterId, payload) {
        return invitation_shared_1.sharedInvitationService.createInvitation(inviterId, payload, this.repository, {
            invitationLabel: "Accountant",
            createInvitationPayload: (companyAdmin, request, token, expiresAt) => ({
                ...request,
                companyId: companyAdmin.companyId,
                invitedBy: companyAdmin._id,
                invitedByType: types_1.ActorType.COMPANY_ADMIN,
                token,
                expiresAt,
            }),
            createAccount: async (invitation, request, hashedPassword, session) => {
                return accountant_repository_1.accountantRepository.create({
                    companyId: invitation.companyId,
                    email: invitation.email,
                    fullName: request.fullName,
                    password: hashedPassword,
                    phoneNumber: request.phoneNumber,
                    department: invitation.department,
                }, { session });
            },
            findExistingUserByEmail: async (email) => accountant_repository_1.accountantRepository.findByEmail(email),
            invitationDetails: (invitation) => ({
                summary: `Department: ${invitation.department}`,
            }),
        });
    }
    async validateInvitation(token) {
        return invitation_shared_1.sharedInvitationService.validateInvitation(token, this.repository, {
            invitationLabel: "Accountant",
            invitationDetails: (invitation) => ({
                summary: `Department: ${invitation.department}`,
            }),
        });
    }
    async resendInvitation(inviterId, invitationId) {
        return invitation_shared_1.sharedInvitationService.resendInvitation(inviterId, invitationId, this.repository, {
            invitationLabel: "Accountant",
            createInvitationPayload: () => ({}),
            createAccount: async () => {
                throw new Error("Not used in resend flow");
            },
            findExistingUserByEmail: async (email) => accountant_repository_1.accountantRepository.findByEmail(email),
            invitationDetails: (invitation) => ({
                summary: `Department: ${invitation.department}`,
            }),
        });
    }
    async acceptInvitation(payload) {
        return invitation_shared_1.sharedInvitationService.acceptInvitation(payload, this.repository, {
            invitationLabel: "Accountant",
            createInvitationPayload: () => ({}),
            createAccount: async (invitation, request, hashedPassword, session) => {
                const account = await accountant_repository_1.accountantRepository.create({
                    companyId: invitation.companyId,
                    email: invitation.email,
                    fullName: request.fullName,
                    password: hashedPassword,
                    phoneNumber: request.phoneNumber,
                    department: invitation.department,
                }, { session });
                return {
                    id: account._id.toString(),
                    email: account.email,
                    fullName: account.fullName,
                    department: account.department,
                };
            },
            findExistingUserByEmail: async (email) => accountant_repository_1.accountantRepository.findByEmail(email),
            invitationDetails: (invitation) => ({
                summary: `Department: ${invitation.department}`,
            }),
        });
    }
}
exports.invitationService = new InvitationService(invitation_repository_1.invitationRepository);
