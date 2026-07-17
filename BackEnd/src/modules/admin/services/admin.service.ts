import { NotFoundError } from "../../../common/errors/NotFoundError";
import { adminRepository, IAdminRepository } from "../repositories/admin.repository";
import { AdminProfileDto, mapAdminProfile } from "../mappers/admin.mapper";
import { ConflictError } from "../../../common/errors/ConflictError";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { compareValue, hashValue } from "../../../common/utils/bcrypt";
import { SuperAdminLoginInput } from "../validators/admin.validation";
import { AdminAuthResponse } from "../mappers/admin.mapper";
import { IPasswordActor } from "../../../common/contracts/actorContracts";
import { generateAccessToken,generateRefreshToken } from "../../../common/utils/jwt";
import { ActorType } from "../../../common/types";
import { mapAdminLoginResponse } from "../mappers/admin.mapper";
import { IAdmin } from "../model/admin.model";
import { DUMMY_PASSWORD_HASH } from "../../../common/constants/constants";
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AdminService {
  constructor(private readonly repository: IAdminRepository) {}

 
    private assertActiveAccount(
    isActive: boolean,
    message: string
  ): void {
    if (!isActive) {
      throw new ForbiddenError(message);
    }
  }
private buildAuthResponse({
    message,
  user,


  }: {
    message: string;
    user: IAdmin
 

  }): AdminAuthResponse {
    const tokens = this.generateTokens(user._id.toString());

    return mapAdminLoginResponse({
      message,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
    });
  }
 private generateTokens(
    id: string,
  ): AuthTokens {
    const payload = { id, actorType:ActorType.ADMIN };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }

    async login(
      payload: SuperAdminLoginInput
    ): Promise<AdminAuthResponse> {
      const admin = await this.requireValidCredentials(
        () => this.repository.findByEmailWithPassword(payload.email),
        payload.password
      );
  
      this.assertActiveAccount(admin.isActive, "Super admin account is inactive");
  
      const lastLogin = new Date();
      this.repository
        .updateLastLogin(admin._id.toString(), lastLogin)
        .catch(() => undefined);
  
      return this.buildAuthResponse({
        message: "Super admin login successful",
        user: admin,
      });
    }
  
  private async requireValidCredentials<T extends IPasswordActor>(
    getUser: () => Promise<T | null>,
    password: string
  ): Promise<T> {
    const user = await getUser();
    const hashToCompare = user?.password ?? DUMMY_PASSWORD_HASH;
    const isPasswordValid = await compareValue(password, hashToCompare);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return user;
  }

   async getProfile(adminId: string): Promise<AdminProfileDto> {
    const admin = await this.repository.findById(adminId);

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    return mapAdminProfile(admin);
  }
}

export const adminService = new AdminService(adminRepository);
