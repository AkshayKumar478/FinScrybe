import { ActorType } from "../types";
import { adminRepository } from "../../modules/admin/repositories/admin.repository";
import {IAdminRepository} from '../../modules/admin/repositories/admin.repository.interface'
import { companyAdminRepository } from "../../modules/companyAdmin/repositories/companyAdmin.repository";
import { ICompanyAdminRepository } from "../../modules/companyAdmin/repositories/companyAdmin.repository.interface";
import { accountantRepository, type IAccountantRepository } from "../../modules/companyAccountant/repositories/accountant.repository";
import {IAuthenticatedActorService,AuthActor }from './authenticatedActor.service.interface'
export class AuthenticatedActorService
  implements IAuthenticatedActorService
{
  constructor(private readonly adminRepository:IAdminRepository,companyAdminRepository:ICompanyAdminRepository, accountantRepository:IAccountantRepository){}

  
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
        return this.adminRepository.findByEmail(email);
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
        return this.adminRepository.findById(actorId);
      case ActorType.COMPANY_ADMIN:
        return companyAdminRepository.findById(actorId);
      case ActorType.ACCOUNTANT:
        return accountantRepository.findById(actorId);
      default:
        return null;
    }
  }
}



export const authenticatedActorService=new AuthenticatedActorService( adminRepository,companyAdminRepository,accountantRepository)