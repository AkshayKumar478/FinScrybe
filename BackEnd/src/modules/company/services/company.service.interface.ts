import { ActorType } from "../../../common/types";

import { CompanyDto, CompanyRegistrationResponse,RegistrationStartResponse ,RegistrationOtpVerificationResponse} from "../mappers/company.mapper.interface";
import {RegistrationOtpResendResponse} from '../mappers/company.mapper.interface'
import { CompanyRegistrationInput } from  "../validators/company.validation";


export interface ICompanyService {
  startRegistration(payload:CompanyRegistrationInput):Promise<RegistrationStartResponse>
  resendOtp(email:string):Promise<RegistrationOtpResendResponse>
  verifyRegistrationOtp(email:string,otp:string):Promise<RegistrationOtpVerificationResponse>
  completeRegistration(verificationToken:string):Promise<CompanyRegistrationResponse>


  listAll(): Promise<CompanyDto[]>;
  getById(companyId: string): Promise<CompanyDto>;
  getCurrentUsersCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<CompanyDto>;
}
