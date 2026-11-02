import { emailService } from "../../../common/services/emailService/email.service";
import { IEmailService } from "../../../common/services/emailService/email.service.interface";
import type { IAccountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { accountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { IInvitationRepository } from "../repositories/invitation.repository.interface";
import { invitationRepository, InvitationRepository } from "../repositories/invitation.repository";
import type { createInvitationInput } from "../validators/invitation.validation";
import type { IInvitationService } from "./invitation.service.interface";
import type { InvitationResponse } from "../mappers/invitation.mapper.interface";
import normalizeEmail from "../../../common/utils/emailNormalize";
import { ConflictError } from "../../../common/errors/ConflictError";
import { AccountantMessage } from "../../../common/constants/messages";
import { generateToken } from "../../../common/utils/token";
import { hashValue } from "../../../common/utils/bcrypt";
import { getExpiry } from "../../../common/utils/otp";
import { InvitationStatus } from "../../../common/types";
import { Types } from "mongoose";
import { mapInvitation } from "../mappers/invitation.mapper";
class InvitationService implements IInvitationService{
    constructor(private readonly emailService:IEmailService,private readonly accountantRepo:IAccountantRepository,private readonly repository:IInvitationRepository){
       
    }

   async createInvitation(payload:createInvitationInput,companyId:string,invitedBy:string):Promise<InvitationResponse>{

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
      
     return mapInvitation(invitation)
     
     


          
    }
}

const invitationService = new InvitationService(emailService,accountantRepository,invitationRepository)