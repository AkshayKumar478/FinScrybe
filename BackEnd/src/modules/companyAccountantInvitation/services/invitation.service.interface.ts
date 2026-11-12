import type { InvitationResponse, InvitationValidationResponse } from "../mappers/invitation.mapper.interface";
import type {
  CreateInvitationInput,
  ValidateInvitationParams,
  ValidateInvitationQuery,
} from "../validators/invitation.validation";

export interface IInvitationService {
  createInvitation(payload: CreateInvitationInput, companyId: string,invitedBy: string): Promise<InvitationResponse>;

  resendInvitation(invitationId: string,  companyId: string ): Promise<InvitationResponse>;

  cancelInvitation( invitationId: string, companyId: string): Promise<InvitationResponse>;

  validateInvitation(params: ValidateInvitationParams,query: ValidateInvitationQuery): Promise<InvitationValidationResponse>;
  listCompanyInvitations(companyId: string): Promise<InvitationResponse[]>;
  
}