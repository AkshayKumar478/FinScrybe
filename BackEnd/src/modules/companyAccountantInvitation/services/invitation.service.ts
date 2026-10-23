import { emailService } from "../../../common/services/emailService/email.service";
import { IEmailService } from "../../../common/services/emailService/email.service.interface";
import type { IAccountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { accountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { IInvitationRepository } from "../repositories/invitation.repository.interface";
import { invitationRepository, InvitationRepository } from "../repositories/invitation.repository";
class InvitationService{
    constructor(private readonly emailService:IEmailService,accountantRepo:IAccountantRepository,repository:IInvitationRepository){
       
    }

    CreateInvitation(email:string){

    }
}

const invitationService = new InvitationService(emailService,accountantRepository,invitationRepository)