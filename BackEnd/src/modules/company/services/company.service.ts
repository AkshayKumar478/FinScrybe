import { ActorType, CompanyStatus } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { companyRepository,} from "../repositories/company.repository";
import { ICompanyRepository} from "../repositories/company,repository.interface";
import { mapCompanies, mapCompany,mapCompanyRegistrationResponse } from "../mappers/company.mapper";
import { CompanyDto, CompanyRegistrationResponse } from "../mappers/company.mapper.interface";
import { ICompany } from "../model/model.interface";
import { ICompanyAdmin } from "../../companyAdmin/model/model";
import { ICompanyRegistrationPayload, ICompanyRegistrationResult } from "../contracts";
import { companyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import { ICompanyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository.interface";
import mongoose from "mongoose";
import { authenticatedActorService } from "../../../common/services/authenticatedActor.service";
import { CompanyRegistrationInput } from  "../validators/company.validation";
import { ConflictError } from "../../../common/errors/ConflictError";
import {CompanyAdminMessage, CompanyRegistrationMessage ,AccountantMessage, GeneralMessage} from '../../../common/constants/messages'

import { hashValue } from "../../../common/utils/bcrypt";

export interface ICompanyService {
  registerCompany(
    payload: CompanyRegistrationInput
  ): Promise<CompanyRegistrationResponse>;
  listAll(): Promise<CompanyDto[]>;
  listPending(): Promise<CompanyDto[]>;
  getById(companyId: string): Promise<CompanyDto>;
  getCurrentUsersCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<CompanyDto>;
  updateStatus(
    companyId: string,
    status: CompanyStatus,
    approvedBy: string
  ): Promise<CompanyDto>;
}

class CompanyService implements ICompanyService {
  constructor(private readonly repository: ICompanyRepository,private readonly companyAdminRepo: ICompanyAdminRepository) { }
  
   private async assertCompanyRegistrationAvailability(
      payload: CompanyRegistrationInput
    ): Promise<void> {
      const [existingCompany, existingCompanyAdmin] = await Promise.all([
        this.repository.findCompanyByEmail(payload.companyEmail),
        this.companyAdminRepo.findByEmail(payload.adminEmail),
      ]);
  
      if (existingCompany) {
        throw new ConflictError(CompanyRegistrationMessage.COMPANY_ALREADY_EXISTS);
      }
  
      if (existingCompanyAdmin) {
        throw new ConflictError(CompanyAdminMessage.COMPANY_ADMIN_EMAIL_ALREADY_REGISTERED);
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
  
  async registerCompany(
      payload: CompanyRegistrationInput
    ): Promise<CompanyRegistrationResponse> {
      await this.assertCompanyRegistrationAvailability(payload);
  
      const hashedPassword = await hashValue(payload.adminPassword);
  
      const { company, companyAdmin } =
        await this.createCompanyRegistration({
          company: {
            companyName: payload.companyName,
            industry: payload.industry,
            companyEmail: payload.companyEmail,
            companyPhone: payload.companyPhone,
          },
          companyAdmin: {
            fullName: payload.adminFullName,
            email: payload.adminEmail,
            password: hashedPassword,
            phoneNumber: payload.adminPhoneNumber,
          },
        });
  
      return mapCompanyRegistrationResponse(company, companyAdmin);
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
    error.code === 11000
  );
};

export const companyService = new CompanyService(companyRepository,companyAdminRepository);
