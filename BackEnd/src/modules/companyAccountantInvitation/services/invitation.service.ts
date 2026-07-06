import { ActorType } from "../../../common/types";
import { mapAccountantAccount } from "../../companyAccountant/mappers/accountant.mapper";
import { accountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { sharedInvitationService } from "../../companyAdminInvitation/services/invitation.shared";
import {
  invitationRepository,
  IInvitationRepository,
} from "../repositories/invitation.repository";

class InvitationService {
  constructor(private readonly repository: IInvitationRepository) {}

  async createInvitation(
    inviterId: string,
    payload: { email: string; department: string }
  ) {
    return sharedInvitationService.createInvitation(
      inviterId,
      payload,
      this.repository,
      {
        invitationLabel: "Accountant",
        createInvitationPayload: (companyAdmin, request, token, expiresAt) => ({
          ...(request as { email: string; department: string }),
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
          return accountantRepository.create(
            {
              companyId: invitation.companyId,
              email: invitation.email,
              fullName: request.fullName,
              password: hashedPassword,
              phoneNumber: request.phoneNumber,
              department: invitation.department,
            },
            { session }
          );
        },
        findExistingUserByEmail: async (email) =>
          accountantRepository.findByEmail(email),
        invitationDetails: (invitation) => ({
          summary: `Department: ${invitation.department}`,
        }),
      }
    );
  }

  async validateInvitation(token: string) {
    return sharedInvitationService.validateInvitation(
      token,
      this.repository,
      {
        invitationLabel: "Accountant",
        invitationDetails: (invitation) => ({
          summary: `Department: ${invitation.department}`,
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
        invitationLabel: "Accountant",
        createInvitationPayload: () => ({}),
        createAccount: async () => {
          throw new Error("Not used in resend flow");
        },
        findExistingUserByEmail: async (email) =>
          accountantRepository.findByEmail(email),
        invitationDetails: (invitation) => ({
          summary: `Department: ${invitation.department}`,
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
        invitationLabel: "Accountant",
        createInvitationPayload: () => ({}),
        createAccount: async (
          invitation,
          request,
          hashedPassword,
          session
        ) => {
          const account = await accountantRepository.create(
            {
              companyId: invitation.companyId,
              email: invitation.email,
              fullName: request.fullName,
              password: hashedPassword,
              phoneNumber: request.phoneNumber,
              department: invitation.department,
            },
            { session }
          );

          return mapAccountantAccount(account);
        },
        findExistingUserByEmail: async (email) =>
          accountantRepository.findByEmail(email),
        invitationDetails: (invitation) => ({
          summary: `Department: ${invitation.department}`,
        }),
      }
    );
  }
}

export const invitationService = new InvitationService(
  invitationRepository
);
