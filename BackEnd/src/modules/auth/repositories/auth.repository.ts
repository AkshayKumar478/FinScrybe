import { adminRepository } from "../../admin/repositories/admin.repository";
import { companyRepository } from "../../company/repositories/company.repository";
import { accountantRepository } from "../../companyAccountant/repositories/accountant.repository";
import { companyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import { IAdmin } from "../../admin/model/admin.model";
import { ICompany } from "../../company/model/model";
import { IAccountant } from "../../companyAccountant/model/accountantModel";
import { ICompanyAdmin } from "../../companyAdmin/model/model";
import { ActorType } from "../../../common/types";
import mongoose from "mongoose";
import { ConflictError } from "../../../common/errors/ConflictError";
import {
  IAuthenticatedActorRepository,
  IAuthLoginRepository,
  ICompanyRegistrationPayload,
  ICompanyRegistrationResult,
  IPasswordResetActorRepository,
} from "../auth.contracts";

export type AuthActor = IAdmin | ICompanyAdmin | IAccountant;

 class AuthRepository
  implements
    IAuthLoginRepository,
    IPasswordResetActorRepository,
    IAuthenticatedActorRepository
{
  async findSuperAdminByEmail(email: string): Promise<IAdmin | null> {
    return adminRepository.findByEmailWithPassword(email);
  }

  async updateSuperAdminLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IAdmin | null> {
    return adminRepository.updateLastLogin(id, lastLogin);
  }

  async findCompanyByEmail(email: string): Promise<ICompany | null> {
    return companyRepository.findByEmail(email);
  }

  async findCompanyById(id: string): Promise<ICompany | null> {
    return companyRepository.findById(id);
  }

  async findCompanyAdminByEmail(
    email: string
  ): Promise<ICompanyAdmin | null> {
    return companyAdminRepository.findByEmailWithPassword(email);
  }

  async updateCompanyAdminLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<ICompanyAdmin | null> {
    return companyAdminRepository.updateLastLogin(id, lastLogin);
  }

  async findAccountantByEmail(
    email: string
  ): Promise<IAccountant | null> {
    return accountantRepository.findByEmailWithPassword(email);
  }

  async updateAccountantLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IAccountant | null> {
    return accountantRepository.updateLastLogin(id, lastLogin);
  }

  async findActorByEmail(
    actorType: ActorType,
    email: string
  ): Promise<AuthActor | null> {
    switch (actorType) {
      case ActorType.ADMIN:
        return adminRepository.findByEmail(email);
      case ActorType.COMPANY_ADMIN:
        return companyAdminRepository.findByEmail(email);
      case ActorType.ACCOUNTANT:
        return accountantRepository.findByEmail(email);
      default:
        return null;
    }
  }

  async updateActorPassword(
    actorType: ActorType,
    actorId: string,
    password: string
  ): Promise<AuthActor | null> {
    switch (actorType) {
      case ActorType.ADMIN:
        return adminRepository.updateById(actorId, { password });
      case ActorType.COMPANY_ADMIN:
        return companyAdminRepository.updateById(actorId, { password });
      case ActorType.ACCOUNTANT:
        return accountantRepository.updateById(actorId, { password });
      default:
        return null;
    }
  }

  async findActorById(
    actorType: ActorType,
    actorId: string
  ): Promise<AuthActor | null> {
    switch (actorType) {
      case ActorType.ADMIN:
        return adminRepository.findById(actorId);
      case ActorType.COMPANY_ADMIN:
        return companyAdminRepository.findById(actorId);
      case ActorType.ACCOUNTANT:
        return accountantRepository.findById(actorId);
      default:
        return null;
    }
  }

  async createCompanyRegistration(
    payload: ICompanyRegistrationPayload
  ): Promise<ICompanyRegistrationResult> {
    const session = await mongoose.startSession();

    try {
      let company: ICompany | null = null;
      let companyAdmin: ICompanyAdmin | null = null;

      await session.withTransaction(async () => {
        company = await companyRepository.create(payload.company, { session });

        companyAdmin = await companyAdminRepository.create(
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

        await companyRepository.assignCompanyAdmin(
          company!._id.toString(),
          companyAdmin!._id,
          { session, new: true }
        );
      });

      if (!company || !companyAdmin) {
        throw new Error("Company registration transaction did not complete");
      }

      return { company, companyAdmin };
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        throw new ConflictError("Company or company admin already exists");
      }

      throw error;
    } finally {
      await session.endSession();
    }
  }
}

export const authRepository = new AuthRepository();

const isDuplicateKeyError = (
  error: unknown
): error is mongoose.mongo.MongoServerError => {
  return (
    error instanceof mongoose.mongo.MongoServerError &&
    error.code === 11000
  );
};
