import { ActorType } from "../types";
import { adminRepository } from "../../modules/admin/repositories/admin.repository";
import { companyAdminRepository } from "../../modules/companyAdmin/repositories/companyAdmin.repository";
import { accountantRepository } from "../../modules/companyAccountant/repositories/accountant.repository";
import { ICompanyAdmin } from "../../modules/companyAdmin/model/model";
import { IAccountant } from "../../modules/companyAccountant/model/accountantModel";
import { IAdmin } from "../../modules/admin/model/admin.model";

export type AuthActor = IAdmin | ICompanyAdmin | IAccountant;
export class AuthenticatedActorService {
  async findActor(actorType: ActorType, id: string) {
    switch (actorType) {
      case ActorType.ADMIN:
        return adminRepository.findById(id);

      case ActorType.COMPANY_ADMIN:
        return companyAdminRepository.findById(id);

      case ActorType.ACCOUNTANT:
        return accountantRepository.findById(id);
    }
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
  
}


export const authenticatedActorService=new AuthenticatedActorService()