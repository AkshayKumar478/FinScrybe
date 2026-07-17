import { ActorType } from "../types";
import { adminRepository } from "../../modules/admin/repositories/admin.repository";

export class AuthenticatedActorService {
  async findActor(actorType: ActorType, id: string) {
    switch (actorType) {
      case ActorType.ADMIN:
        return adminRepository.findById(id);

    //   case ActorType.COMPANY_ADMIN:
    //     return companyAdminRepository.findById(id);

    //   case ActorType.ACCOUNTANT:
    //     return accountantRepository.findById(id);
    }
  }
}

export const authenticatedActorService=new AuthenticatedActorService()