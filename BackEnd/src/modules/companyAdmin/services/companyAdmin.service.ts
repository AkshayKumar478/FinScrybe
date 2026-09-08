import { ActorType } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { compareValue } from "../../../common/utils/bcrypt";
import { DUMMY_PASSWORD_HASH } from "../../../common/constants/constants";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../common/utils/jwt";
import {
  CompanyAdminAuthResponse,
  mapCompanyAdminLoginResponse,
} from "../mappers/companyAdmin.mapper";
import { CompanyAdminLoginInput } from "../validators/companyAdmin.validation";

import {
  companyAdminRepository,
  ICompanyAdminRepository,
} from "../repositories/companyAdmin.repository";

export interface ICompanyAdminService {
  login(payload: CompanyAdminLoginInput): Promise<CompanyAdminAuthResponse>;
}

class CompanyAdminService implements ICompanyAdminService {
  constructor(private readonly repository: ICompanyAdminRepository) {}

  async login(
    payload: CompanyAdminLoginInput
  ): Promise<CompanyAdminAuthResponse> {
    const admin = await this.repository.findByEmailWithPassword(payload.email);
    const passwordHash = admin?.password ?? DUMMY_PASSWORD_HASH;
    const passwordMatches = await compareValue(payload.password, passwordHash);

    if (!admin || !passwordMatches) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!admin.isActive) {
      throw new ForbiddenError("This company admin account is inactive");
    }

    const tokenPayload = {
      id: admin._id.toString(),
      actorType: ActorType.COMPANY_ADMIN,
    };

    void this.repository.updateLastLogin(admin._id.toString(), new Date());

    return mapCompanyAdminLoginResponse({
      accessToken: generateAccessToken(tokenPayload),
      refreshToken: generateRefreshToken(tokenPayload),
      user: admin,
    });
  }

}

export const companyAdminService = new CompanyAdminService(
  companyAdminRepository
);
