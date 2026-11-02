import { InvitationResponse } from "../mappers/invitation.mapper.interface"
import type { createInvitationInput } from "../validators/invitation.validation"
export interface IInvitationService{

   createInvitation(payload:createInvitationInput,companyId:string,invitedBy:string) :Promise<InvitationResponse>
}