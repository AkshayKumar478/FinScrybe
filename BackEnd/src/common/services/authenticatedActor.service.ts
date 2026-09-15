import { ActorType } from "../types";
import { adminRepository } from "../../modules/admin/repositories/admin.repository";
import { companyAdminRepository } from "../../modules/companyAdmin/repositories/companyAdmin.repository";
import { accountantRepository } from "../../modules/companyAccountant/repositories/accountant.repository";
import { ICompanyAdmin } from "../../modules/companyAdmin/model/model";
import { IAccountant } from "../../modules/companyAccountant/model/accountantModel";
import { IAdmin } from "../../modules/admin/model/admin.model.interface";

export type AuthActor = IAdmin | ICompanyAdmin | IAccountant;

export interface IAuthenticatedActorService {
  findActor(actorType: ActorType, id: string): Promise<AuthActor | null>;
  findActorByEmail(
    actorType: ActorType,
    email: string
  ): Promise<AuthActor | null>;
  findActorById(
    actorType: ActorType,
    actorId: string
  ): Promise<AuthActor | null>;
}

export class AuthenticatedActorService
  implements IAuthenticatedActorService
{
  async findActor(
    actorType: ActorType,
    id: string
  ): Promise<AuthActor | null> {
    return this.findActorById(actorType, id);
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