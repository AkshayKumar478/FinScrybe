
import { SuperAdminLoginInput } from "../validators/admin.validation";
import {IAdminAuthResponse, IAdminAuthUser} from "../mappers/admin.mappers.interfaces"


export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export interface IAdminService { 
  login(payload: SuperAdminLoginInput): Promise<IAdminAuthResponse>
   refreshToken(refreshToken: string): Promise<AuthTokens>;
  getCurrentAdmin(adminId: string): Promise<IAdminAuthUser>;
}
