"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminInvitationService = void 0;
const types_1 = require("../../../common/types");
const companyAdmin_mapper_1 = require("../../companyAdmin/mappers/companyAdmin.mapper");
const companyAdmin_repository_1 = require("../../companyAdmin/repositories/companyAdmin.repository");
const companyAdminInvitation_repository_1 = require("../repositories/companyAdminInvitation.repository");
const invitation_shared_1 = require("./invitation.shared");
class CompanyAdminInvitationService {
    constructor(repository) {
        this.repository = repository;
    }
    async createInvitation(inviterId, payload) {
        return invitation_shared_1.sharedInvitationService.createInvitation(inviterId, payload, this.repository, {
            invitationLabel: "Company admin",
            createInvitationPayload: (companyAdmin, request, token, expiresAt) => ({
                ...request,
                companyId: companyAdmin.companyId,
                invitedBy: companyAdmin._id,
                invitedByType: types_1.ActorType.COMPANY_ADMIN,
                token,
                expiresAt,
            }),
            createAccount: async (invitation, request, hashedPassword, session) => {
                return companyAdmin_repository_1.companyAdminRepository.create({
                    companyId: invitation.companyId,
                    email: invitation.email,
                    fullName: request.fullName,
                    password: hashedPassword,
                    phoneNumber: request.phoneNumber,
                    role: invitation.role,
                    invitedBy: invitation.invitedBy,
                    isPrimaryAdmin: false,
                }, { session });
            },
            findExistingUserByEmail: async (email) => companyAdmin_repository_1.companyAdminRepository.findByEmail(email),
            invitationDetails: (invitation) => ({
                summary: `Role: ${invitation.role}`,
            }),
        });
    }
    async validateInvitation(token) {
        return invitation_shared_1.sharedInvitationService.validateInvitation(token, this.repository, {
            invitationLabel: "Company admin",
            invitationDetails: (invitation) => ({
                summary: `Role: ${invitation.role}`,
            }),
        });
    }
    async resendInvitation(inviterId, invitationId) {
        return invitation_shared_1.sharedInvitationService.resendInvitation(inviterId, invitationId, this.repository, {
            invitationLabel: "Company admin",
            createInvitationPayload: () => ({}),
            createAccount: async () => {
                throw new Error("Not used in resend flow");
            },
            findExistingUserByEmail: async (email) => companyAdmin_repository_1.companyAdminRepository.findByEmail(email),
            invitationDetails: (invitation) => ({
                summary: `Role: ${invitation.role}`,
            }),
        });
    }
    async acceptInvitation(payload) {
        return invitation_shared_1.sharedInvitationService.acceptInvitation(payload, this.repository, {
            invitationLabel: "Company admin",
            createInvitationPayload: () => ({}),
            createAccount: async (invitation, request, hashedPassword, session) => {
                const account = await companyAdmin_repository_1.companyAdminRepository.create({
                    companyId: invitation.companyId,
                    email: invitation.email,
                    fullName: request.fullName,
                    password: hashedPassword,
                    phoneNumber: request.phoneNumber,
                    role: invitation.role,
                    invitedBy: invitation.invitedBy,
                    isPrimaryAdmin: false,
                }, { session });
                return (0, companyAdmin_mapper_1.mapCompanyAdminAccount)(account);
            },
            findExistingUserByEmail: async (email) => companyAdmin_repository_1.companyAdminRepository.findByEmail(email),
            invitationDetails: (invitation) => ({
                summary: `Role: ${invitation.role}`,
            }),
        });
    }
}
exports.companyAdminInvitationService = new CompanyAdminInvitationService(companyAdminInvitation_repository_1.companyAdminInvitationRepository);
