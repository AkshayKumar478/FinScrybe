import { ActorType, CompanyAdminRole } from "../../../common/types";
import { mapCompanyAdminAccount } from "../../companyAdmin/mappers/companyAdmin.mapper";
import { companyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import {
  companyAdminInvitationRepository,
  ICompanyAdminInvitationRepository,
} from "../repositories/companyAdminInvitation.repository";
import { sharedInvitationService } from "./invitation.shared";

class CompanyAdminInvitationService {
  constructor(
    private readonly repository: ICompanyAdminInvitationRepository
  ) {}

  async createInvitation(
    inviterId: string,
    payload: { email: string; role: CompanyAdminRole }
  ) {
    return sharedInvitationService.createInvitation(
      inviterId,
      payload,
      this.repository,
      {
        invitationLabel: "Company admin",
        createInvitationPayload: (companyAdmin, request, token, expiresAt) => ({
          ...(request as { email: string; role: CompanyAdminRole }),
          companyId: companyAdmin.companyId,
          invitedBy: companyAdmin._id,
          invitedByType: ActorType.COMPANY_ADMIN,
          token,
          expiresAt,
        }),
        createAccount: async (
          invitation,
          request,
          hashedPassword,
          session
        ) => {
          return companyAdminRepository.create(
            {
              companyId: invitation.companyId,
              email: invitation.email,
              fullName: request.fullName,
              password: hashedPassword,
              phoneNumber: request.phoneNumber,
              role: invitation.role,
              invitedBy: invitation.invitedBy,
              isPrimaryAdmin: false,
            },
            { session }
          );
        },
        findExistingUserByEmail: async (email) =>
          companyAdminRepository.findByEmail(email),
        invitationDetails: (invitation) => ({
          summary: `Role: ${invitation.role}`,
        }),
      }
    );
  }

  async validateInvitation(token: string) {
    return sharedInvitationService.validateInvitation(
      token,
      this.repository,
      {
        invitationLabel: "Company admin",
        invitationDetails: (invitation) => ({
          summary: `Role: ${invitation.role}`,
        }),
      }
    );
  }

  async resendInvitation(inviterId: string, invitationId: string) {
    return sharedInvitationService.resendInvitation(
      inviterId,
      invitationId,
      this.repository,
      {
        invitationLabel: "Company admin",
        createInvitationPayload: () => ({}),
        createAccount: async () => {
          throw new Error("Not used in resend flow");
        },
        findExistingUserByEmail: async (email) =>
          companyAdminRepository.findByEmail(email),
        invitationDetails: (invitation) => ({
          summary: `Role: ${invitation.role}`,
        }),
      }
    );
  }

  async acceptInvitation(payload: {
    token: string;
    fullName: string;
    password: string;
    phoneNumber: string;
  }) {
    return sharedInvitationService.acceptInvitation(
      payload,
      this.repository,
      {
        invitationLabel: "Company admin",
        createInvitationPayload: () => ({}),
        createAccount: async (
          invitation,
          request,
          hashedPassword,
          session
        ) => {
          const account = await companyAdminRepository.create(
            {
              companyId: invitation.companyId,
              email: invitation.email,
              fullName: request.fullName,
              password: hashedPassword,
              phoneNumber: request.phoneNumber,
              role: invitation.role,
              invitedBy: invitation.invitedBy,
              isPrimaryAdmin: false,
            },
            { session }
          );

          return mapCompanyAdminAccount(account);
        },
        findExistingUserByEmail: async (email) =>
          companyAdminRepository.findByEmail(email),
        invitationDetails: (invitation) => ({
          summary: `Role: ${invitation.role}`,
        }),
      }
    );
  }
}

export const companyAdminInvitationService =
  new CompanyAdminInvitationService(companyAdminInvitationRepository);
