import { ActorType } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";

import {
  companyAdminRepository,
  ICompanyAdminRepository,
} from "../repositories/companyAdmin.repository";

class CompanyAdminService {
  constructor(private readonly repository: ICompanyAdminRepository) {

  }

}

export const companyAdminService = new CompanyAdminService(
  companyAdminRepository
);
