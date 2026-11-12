import { emailService } from "../../../common/services/emailService/email.service";
import { IEmailService } from "../../../common/services/emailService/email.service.interface";
import type { IAccountantRepository } from "../../companyAccountant/repositories/accountant.repository.interface";
import { accountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { IInvitationRepository } from "../repositories/invitation.repository.interface";
import { invitationRepository } from "../repositories/invitation.repository";
import type { CreateInvitationInput } from "../validators/invitation.validation";
import type { IInvitationService } from "./invitation.service.interface";
import type { InvitationResponse } from "../mappers/invitation.mapper.interface";
import normalizeEmail from "../../../common/utils/emailNormalize";
import { ConflictError } from "../../../common/errors/ConflictError";
import { AccountantMessage, InvitationMessages } from "../../../common/constants/messages";
import { generateToken } from "../../../common/utils/token";
import { hashValue } from "../../../common/utils/bcrypt";
import { getExpiry } from "../../../common/utils/otp";
import { InvitationStatus } from "../../../common/types";
import { mapInvitation, mapInvitationValidation } from "../mappers/invitation.mapper";
import { accountantInvitationTemplate } from "../../../common/Templates/accountantInvitationTemplate/accountantInvitation.Template";
import { companyAdminRepository, CompanyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import { ICompanyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository.interface";
import { compareValue } from "../../../common/utils/bcrypt";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import type { InvitationValidationResponse } from "../mappers/invitation.mapper.interface";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import type {
  ValidateInvitationParams,
  ValidateInvitationQuery,
} from "../validators/invitation.validation";
import { IInvitation } from "../model/invitation.model.interface";
import { env } from "../../../config/env";
import { mapInvitations } from "../mappers/invitation.mapper";
class InvitationService implements IInvitationService{
    constructor(private readonly emailService:IEmailService,private readonly accountantRepo:IAccountantRepository,private readonly repository:IInvitationRepository,private readonly companyAdminRepo:ICompanyAdminRepository){}
      private async sendInvitationEmail(
        email: string,
        department: string,
        invitationId: string,
        rawToken: string
        ): Promise<void> {
        const invitationUrl = new URL("/accountant/accept-invitation",env.CLIENT_URL);

        invitationUrl.searchParams.set("invitationId", invitationId);
        invitationUrl.searchParams.set("token", rawToken);

        const html = accountantInvitationTemplate({
          email,
          department,
          invitationUrl: invitationUrl.toString(),
        });

        await this.emailService.sendEmail( email,AccountantMessage.ACCOUNTANT_EMAIL_SUBJECT,html);
    }

     async createInvitation(payload:CreateInvitationInput,companyId:string,invitedBy:string):Promise<InvitationResponse>{

        const accountantEmail = normalizeEmail(payload.email)
        const existingAccountant=await this.accountantRepo.findByEmail(accountantEmail)
        if(existingAccountant){
        throw new ConflictError(existingAccountant.companyId.toString()!==companyId?AccountantMessage.ACCOUNTANT_BELONGS_TO_ANOTHER_COMPANY:AccountantMessage.ACCOUNTANT_ALREADY_EXISTS);
        }
        

        const pendingInvitation=await this.repository.findPendingByEmailAndCompany(companyId,accountantEmail)
       if (pendingInvitation) {
                throw new ConflictError(AccountantMessage.INVITATION_ALREADY_EXISTS);
            }
        const token= generateToken()
        const hashedToken= await hashValue(token)
        const expireDate=getExpiry(24*60)
       
         

        const invitation= await this.repository.create({
            companyId,
            invitedBy,
            email:accountantEmail,
            department:payload.department,
            token:hashedToken,
            status:InvitationStatus.PENDING,
            expiresAt:expireDate,
        })
         
        await this.sendInvitationEmail(accountantEmail,payload.department,invitation._id.toString(),token)
       
       return mapInvitation(invitation)
     

    }


  async resendInvitation(invitationId: string, companyId: string): Promise<InvitationResponse> {
    const invitation = await this.repository.findOne({_id: invitationId,companyId,});

    if (!invitation) {
      throw new NotFoundError(InvitationMessages.INVITATION_NOT_FOUND);
    }

    if (invitation.status !== InvitationStatus.PENDING) {
      throw new ConflictError(InvitationMessages.ONLY_PENDING_INVITATIONS_CAN_BE_RESENT);
    }

    const rawToken = generateToken();
    const hashedToken = await hashValue(rawToken);
    const expiresAt = getExpiry(24 * 60);

    const updatedInvitation = await this.repository.refreshInvitation(
      invitationId,
      companyId,
      hashedToken,
      expiresAt
    );

    if (!updatedInvitation) {
      throw new ConflictError(InvitationMessages.iNVITATION_NO_LONGER_PENDING);
    }

    await this.sendInvitationEmail(
      updatedInvitation.email,
      updatedInvitation.department,
      updatedInvitation._id.toString(),
      rawToken
    );

    return mapInvitation(updatedInvitation);
  }


  private async getValidInvitation( invitationId: string,token: string): Promise<IInvitation> {

  const invitation = await this.repository.findById(invitationId);

  if (!invitation ||invitation.status !== InvitationStatus.PENDING ||invitation.expiresAt.getTime() <= Date.now()) {
      throw new ConflictError(InvitationMessages.INVALID_OR_EXPIRED_INVITATION);
    }

    if (!(await compareValue(token, invitation.token))) {
      throw new UnauthorizedError(InvitationMessages.iNVALID_INVITATION_tOKEN);
    }

    return invitation;
  }
    
  async validateInvitation(params: ValidateInvitationParams,query: ValidateInvitationQuery): Promise<InvitationValidationResponse> {

    const invitation= await this.getValidInvitation(  params.invitationId,query.token)
    return mapInvitationValidation(invitation)
  }

  async cancelInvitation(
  invitationId: string,
  companyId: string
): Promise<InvitationResponse> {
  const cancelledInvitation = await this.repository.cancelInvitation(
    invitationId,
    companyId,
    new Date()
  );

  if (cancelledInvitation) {
    return mapInvitation(cancelledInvitation);
  }

  const invitation = await this.repository.findOne({
    _id: invitationId,
    companyId,
  });

  if (!invitation) {
    throw new NotFoundError(InvitationMessages.INVITATION_NOT_FOUND);
  }

  throw new ConflictError(`Cannot cancel an invitation with status ${invitation.status}`);
}
async listCompanyInvitations(companyId: string): Promise<InvitationResponse[]> {
  const invitations = await this.repository.findByCompanyId(companyId);
  return mapInvitations(invitations);
}

}

export const invitationService = new InvitationService(emailService,accountantRepository,invitationRepository,companyAdminRepository)