import { ActorType, CompanyStatus } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { companyRepository,} from "../repositories/company.repository";
import { ICompanyRepository} from "../repositories/company,repository.interface";
import { mapCompanies, mapCompany,mapCompanyRegistrationResponse, mapRegistrationStartResponse,mapStagingToRegistrationPayload } from "../mappers/company.mapper";
import { CompanyDto, CompanyRegistrationResponse} from "../mappers/company.mapper.interface";
import { ICompany } from "../model/model.interface";
import { ICompanyAdmin } from "../../companyAdmin/model/model";
import { ICompanyRegistrationPayload, ICompanyRegistrationResult } from "../contracts";
import { companyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import { ICompanyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository.interface";
import mongoose from "mongoose";
import { authenticatedActorService } from "../../../common/services/actorServices/authenticatedActor.service";
import { CompanyRegistrationInput } from  "../validators/company.validation";
import { ConflictError } from "../../../common/errors/ConflictError";
import {CompanyAdminMessage, CompanyRegistrationMessage ,AccountantMessage, GeneralMessage,OtpVerificationMessage,EmailVerification} from '../../../common/constants/messages'
import {ICompanyService} from './company.service.interface'
import { hashValue } from "../../../common/utils/bcrypt";
import {IOtpService} from '../../../common/services/OTPService/otp.service.interface'
import {IEmailService} from '../../../common/services/emailService/email.service.interface'
import {otpService} from '../../../common/services/OTPService/otp.service'
import {emailService} from '../../../common/services/emailService/email.service'
import {IRegistrationRepository } from '../repositories/registrationStaging.repository.interface'
import {registrationStagingRepository} from '../repositories/registrationStaging.repository'
import {HttpStatus} from '../../../common/constants/httpstatus'
import { OtpValues} from "../../../common/constants/constants"
import { generateRegistrationVerificationToken, verifyRegistrationVerificationToken}from '../../../common/utils/jwt'
class CompanyService implements ICompanyService {
  constructor(private readonly repository: ICompanyRepository,
    private readonly companyAdminRepo: ICompanyAdminRepository,
    private readonly emailService:IEmailService,
    private readonly otpService:IOtpService,
    private readonly  registrationStaging:IRegistrationRepository

    
  ) { }
  
   private async assertCompanyRegistrationAvailability(
      payload: CompanyRegistrationInput
    ): Promise<void> {
      const [existingCompany, existingCompanyAdmin, existingGstin] = await Promise.all([
        this.repository.findCompanyByEmail(payload.companyEmail),
        this.companyAdminRepo.findByEmail(payload.adminEmail),
        this.repository.findByGstin(payload.gstin),
      ]);
  
      if (existingCompany) {
        throw new ConflictError(CompanyRegistrationMessage.COMPANY_ALREADY_EXISTS);
      }
  
      if (existingCompanyAdmin) {
        throw new ConflictError(CompanyAdminMessage.COMPANY_ADMIN_EMAIL_ALREADY_REGISTERED);
      }

      if (existingGstin) {
        throw new ConflictError(CompanyRegistrationMessage.GSTIN_ALREADY_REGISTERED);
      }
    }
  

  
 private async createCompanyRegistration(
    payload: ICompanyRegistrationPayload
  ): Promise<ICompanyRegistrationResult> {
    const session = await mongoose.startSession();

    try {
      let company: ICompany | null = null;
      let companyAdmin: ICompanyAdmin | null = null;

      await session.withTransaction(async () => {
        company = await this.repository.create(payload.company, { session });

        companyAdmin = await this.companyAdminRepo.create(
          {
            companyId: company!._id,
            fullName: payload.companyAdmin.fullName,
            email: payload.companyAdmin.email,
            password: payload.companyAdmin.password,
            phoneNumber: payload.companyAdmin.phoneNumber,
            isPrimaryAdmin: true,
          },
          { session }
        );

        await this.repository.assignCompanyAdmin(
          company!._id.toString(),
          companyAdmin!._id,
          { session, new: true }
        );
      });

      if (!company || !companyAdmin) {
        throw new Error(CompanyRegistrationMessage.COMPANY_REGISTRATION_TRANSACTION_INCOMPLETE);
      }

      return { company, companyAdmin };
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        throw new ConflictError(CompanyRegistrationMessage.COMPANY_OR_COMPANY_ADMIN_EXISTS);
      }

      throw error;
    } finally {
      await session.endSession();
    }
 }
  
  async startRegistration(
    payload:CompanyRegistrationInput
  ){
    await this.assertCompanyRegistrationAvailability(payload);

   const hashedPassword=await hashValue(payload.adminPassword)
     const otp=this.otpService.generate()
     const hashedOtp= await hashValue(otp)
      const now=new Date()
    const otpExpiresAt=new Date(
      now.getTime()+OtpValues.expiresInMinutes*60*1000
    )

    const expiresAt =new Date(
      now.getTime()+60*60*1000
    )

    const staging= await this.registrationStaging.create({
     companyName: payload.companyName,
        industry: payload.industry,
        companyEmail: payload.companyEmail,
        companyPhone: payload.companyPhone,
        gstin: payload.gstin,

        adminFullName: payload.adminFullName,
        adminEmail: payload.adminEmail,
        adminPassword: hashedPassword,
        adminPhoneNumber: payload.adminPhoneNumber,

        otpHash: hashedOtp,
        otpExpiresAt,

        otpAttempts: 0,
        emailVerified: false,

        expiresAt,

    
    })
    await this.emailService.sendEmail(payload.adminEmail,"Verify your FinScrybe registration",
      `
        <div>
          <h2>FinScrybe Email Verification</h2>

          <p>Hello ${payload.adminFullName},</p>

          <p>
            Your OTP for completing your FinScrybe company
            registration is:
          </p>

          <h1>${otp}</h1>

          <p>
            This OTP will expire in
            ${OtpValues.expiresInMinutes} minutes.
          </p>

          <p>
            If you did not initiate this registration,
            you can safely ignore this email.
          </p>
        </div>
      `)
      return mapRegistrationStartResponse(staging._id.toString(),CompanyRegistrationMessage.REGISTRATION_STARTED_MESSAGE)

  }
  async verifyRegistrationOtp(email:string,otp:string){
    const staging=await this.registrationStaging.findByAdminEmail(email)
    if(!staging){
      throw new NotFoundError(CompanyRegistrationMessage.REGISTRATION_NOT_FOUND)
    }
    if(staging.emailVerified){
       throw new ConflictError(EmailVerification.EMAIL_AlREADY_VERIFIED_MESSAGE)
    }

    if(staging.otpAttempts>=OtpValues.maxAttempts){
      throw new ForbiddenError(OtpVerificationMessage.ATTEMPTS_EXCEEDED)
    }
    if(staging.otpExpiresAt.getTime()< Date.now()){
      throw new ForbiddenError(OtpVerificationMessage.OTP_EXPIRED)
    }

    const verifiedOtp= await this.otpService.verify(otp, staging.otpHash)

    if(!verifiedOtp){
      await this.registrationStaging.updateById(staging._id.toString(),{
        $inc:{
          otpAttempts:1
        }
      })
     throw new ForbiddenError(OtpVerificationMessage.INVALID_OTP)
    }

    await this.registrationStaging.updateById(staging._id.toString(),{
      $set:{
        emailVerified:true
      }
    })
    
     const verificationToken=generateRegistrationVerificationToken(staging._id.toString())
    return {
      message:EmailVerification.EMAIL_VERIFIED_MESSAGE,
      verificationToken
    }

  } 


   async completeRegistration(verificationToken:string){
    const payload=verifyRegistrationVerificationToken(verificationToken)

     const staging=await this.registrationStaging.findById(payload.registrationId)
     if(!staging){
      throw new NotFoundError(CompanyRegistrationMessage.REGISTRATION_NOT_FOUND)
    }

    if(!staging.emailVerified){
      throw new ForbiddenError(EmailVerification.VERIFY_EMAIL_MESSAGE)
    }
     const companyRegistrationPayload=mapStagingToRegistrationPayload(staging)
     const {companyAdmin,company}=await this.createCompanyRegistration(companyRegistrationPayload)  

        await this.registrationStaging.deleteById(staging._id.toString())
        return mapCompanyRegistrationResponse(company,companyAdmin)
     
    }

  async listAll(): Promise<CompanyDto[]> {
    const companies = await this.repository.findMany();
    return mapCompanies(companies);
  }
  

  async listPending(): Promise<CompanyDto[]> {
    const companies = await this.repository.findByStatus(CompanyStatus.PENDING);
    return mapCompanies(companies);
  }

  async getById(companyId: string): Promise<CompanyDto> {
    const company = await this.repository.findById(companyId);

    if (!company) {
      throw new NotFoundError(CompanyRegistrationMessage.COMPANY_NOT_FOUND);
    }

    return mapCompany(company);
  }

  async getCurrentUsersCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<CompanyDto> {
    const company = await this.resolveCompanyForActor(actorType, actorId);

    if (!company) {
      throw new NotFoundError(CompanyRegistrationMessage.COMPANY_NOT_FOUND);
    }

    return mapCompany(company);
  }

  async updateStatus(
    companyId: string,
    status: CompanyStatus,
    approvedBy: string
  ): Promise<CompanyDto> {
    const company = await this.repository.findById(companyId);

    if (!company) {
      throw new NotFoundError(CompanyRegistrationMessage.COMPANY_NOT_FOUND);
    }

    const nextApprovedBy =
      status === CompanyStatus.APPROVED ? approvedBy : undefined;
    const nextApprovedAt =
      status === CompanyStatus.APPROVED ? new Date() : undefined;

    const updatedCompany = await this.repository.updateStatus(
      companyId,
      status,
      nextApprovedBy,
      nextApprovedAt
    );

    if (!updatedCompany) {
      throw new NotFoundError(CompanyRegistrationMessage.COMPANY_NOT_FOUND);
    }

    return mapCompany(updatedCompany);
  }

  private async resolveCompanyForActor(
    actorType: ActorType,
    actorId: string
  ) {
    if (actorType === ActorType.COMPANY_ADMIN) {
      const actor = await authenticatedActorService.findActorById(actorType, actorId);

      if (!actor || !("companyId" in actor)) {
        throw new ForbiddenError(CompanyAdminMessage.COMPANY_ADMIN_NOT_LINKED);
      }

      return this.repository.findById(actor.companyId.toString());
    }

    if (actorType === ActorType.ACCOUNTANT) {
      const actor = await authenticatedActorService.findActorById(actorType, actorId);

      if (!actor || !("companyId" in actor)) {
        throw new ForbiddenError(AccountantMessage.ACCOUNTANT_COMPANY_NOT_LINKED);
      }

      return this.repository.findById(actor.companyId.toString());
    }

    throw new ForbiddenError(GeneralMessage.ACTOR_HAS_NO_SCOPED_COMPANY);
  }
}

const isDuplicateKeyError = (
  error: unknown
): error is mongoose.mongo.MongoServerError => {
  return (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === HttpStatus.MONGOOSE_DUPLICATE_KEY_ERROR
  );
};

export const companyService = new CompanyService(companyRepository,companyAdminRepository,emailService,otpService,registrationStagingRepository);
