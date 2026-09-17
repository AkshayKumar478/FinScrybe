import { adminRepository} from "../repositories/admin.repository";
import { IAdminRepository} from "../repositories/admin.repository.interface";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { compareValue, hashValue } from "../../../common/utils/bcrypt";
import { SuperAdminLoginInput } from "../validators/admin.validation";
import {  mapAdminAuthUser } from "../mappers/admin.mapper";
import {IAdminAuthResponse, IAdminAuthUser} from "../mappers/admin.mappers.interfaces"
import { IPasswordActor } from "../../../common/contracts/actorContracts";
import { generateAccessToken,generateRefreshToken } from "../../../common/utils/jwt";
import { ActorType } from "../../../common/types";
import { mapAdminLoginResponse } from "../mappers/admin.mapper";
import { IAdmin } from "../model/admin.model.interface";
import { DUMMY_PASSWORD_HASH } from "../../../common/constants/constants";
import { verifyRefreshToken } from "../../../common/utils/jwt";
import {IAdminService} from './admin.service.interface'
import {AuthTokens} from './admin.service.interface'
import {SuperAdminMessage,JwtMessage} from '../../../common/constants/messages'
class AdminService implements IAdminService{
  constructor(private readonly repository: IAdminRepository) {}

 

private buildAuthResponse({
    message,
  user,


  }: {
    message: string;
    user: IAdmin
 

  }): IAdminAuthResponse {
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
    private async requireValidCredentials<T extends IPasswordActor>(
    getUser: () => Promise<T | null>,
    password: string
  ): Promise<T> {
    const user = await getUser();
    const hashToCompare = user?.password ?? DUMMY_PASSWORD_HASH;
    const isPasswordValid = await compareValue(password, hashToCompare);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedError(SuperAdminMessage.INVALID_CREDENTIALS);
    }

    return user;
  }


    async login(
      payload: SuperAdminLoginInput
    ): Promise<IAdminAuthResponse> {
      const admin = await this.requireValidCredentials(
        () => this.repository.findByEmailWithPassword(payload.email),
        payload.password
      );
  
  
      const lastLogin = new Date();
      this.repository
        .updateLastLogin(admin._id.toString(), lastLogin)
        .catch(() => undefined);
  
      return this.buildAuthResponse({
        message: SuperAdminMessage.LOGIN_SUCCESS,
        user: admin,
      });
    }
  
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
  const payload = verifyRefreshToken(refreshToken);

  const admin = await this.repository.findById(payload.id);

  if (!admin) {
    throw new UnauthorizedError(JwtMessage.INVALID_REFRESH_TOKEN);
  }

  return this.generateTokens(admin._id.toString());
}

  async getCurrentAdmin(adminId: string): Promise<IAdminAuthUser> {
    const admin = await this.repository.findById(adminId);

    if (!admin) {
      throw new UnauthorizedError(SuperAdminMessage.AUTHENTICATED_USER_NOT_FOUND);
    }

    return mapAdminAuthUser(admin);
  }
  


}

export const adminService = new AdminService(adminRepository);
