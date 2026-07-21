import { ActorType } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import {
  AccountantDto,
  mapAccountantProfile,
  mapAccountantProfiles,
} from "../mappers/accountantProfile.mapper";
import {
  accountantRepository,
  IAccountantRepository,
} from "../repositories/accountant.repository";

class AccountantService {
  
}

export const accountantService = new AccountantService();
