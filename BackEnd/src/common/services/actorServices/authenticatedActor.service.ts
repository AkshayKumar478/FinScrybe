import { ActorType } from "../../types";
import { adminRepository } from "../../../modules/admin/repositories/admin.repository";
import {IAdminRepository} from '../../../modules/admin/repositories/admin.repository.interface'
import { companyAdminRepository } from "../../../modules/companyAdmin/repositories/companyAdmin.repository";
import { ICompanyAdminRepository } from "../../../modules/companyAdmin/repositories/companyAdmin.repository.interface";
import { IAccountantRepository } from "../../../modules/companyAccountant/repositories/accountant.repository.interface";
import { accountantRepository } from "../../../modules/companyAccountant/repositories/accountant.repository";
import {IAuthenticatedActorService,AuthActor }from './authenticatedActor.service.interface'
import { AuthenticatedActorContext } from "../../contracts/actorContracts";
import { CompanyAdminRole } from "../../types";
import { ICompanyAdmin } from "../../../modules/companyAdmin/model/model";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { IAccountant } from "../../../modules/companyAccountant/model/accountant.model.interface";
import { AccountantMessage, CompanyAdminMessage } from "../../constants/messages";
export class AuthenticatedActorService
  implements IAuthenticatedActorService
{
  constructor(private readonly adminRepository:IAdminRepository,companyAdminRepository:ICompanyAdminRepository, accountantRepository:IAccountantRepository){}

  
  async findActor(actorType: ActorType, id: string): Promise<AuthActor | null> {
    return this.findActorById(actorType, id);
  }

  async findActorByEmail(actorType: ActorType,email: string): Promise<AuthActor | null> {
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

  async findActorById(actorType: ActorType,actorId: string): Promise<AuthActor | null> {
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

   async getAuthenticatedActor(actorType: ActorType,actorId: string): Promise<AuthenticatedActorContext | null> {
    const actor = await this.findActorById(actorType, actorId);

    if (!actor) {
      return null;
    }

    let companyId: string | undefined;
    let companyAdminRole: CompanyAdminRole | undefined;

    if (actorType === ActorType.COMPANY_ADMIN) {
      const companyAdmin = actor as ICompanyAdmin;

      if (!companyAdmin.companyId) {
        throw new ForbiddenError(
         CompanyAdminMessage.COMPANY_ADMIN_NOT_LINKED
        );
      }

      companyId = companyAdmin.companyId.toString();
      companyAdminRole = companyAdmin.role;
    }

    if (actorType === ActorType.ACCOUNTANT) {
      const accountant = actor as IAccountant;

      if (!accountant.isActive) {
        throw new ForbiddenError(AccountantMessage.ACCOUNT_INACTIVE);
      }

      if (!accountant.companyId) {
        throw new ForbiddenError( AccountantMessage.ACCOUNTANT_COMPANY_NOT_LINKED);
      }

        companyId = accountant.companyId.toString();
  }

    return {
      id: actor._id.toString(),
      actorType,
      email: actor.email,
      fullName: actor.fullName,
      companyId,
      companyAdminRole,
    };
  }
}



export const authenticatedActorService=new AuthenticatedActorService( adminRepository,companyAdminRepository,accountantRepository)