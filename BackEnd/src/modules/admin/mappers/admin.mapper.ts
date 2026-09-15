import { IAdmin } from "../model/admin.model.interface";
import {IAdminAuthResponse,IAdminAuthUser} from'./admin.mappers.interfaces'
import { ActorType } from "../../../common/types"

export function mapAdminAuthUser(
  admin: IAdmin
): IAdminAuthUser {
  return {
    id: admin._id.toString(),
    fullName: admin.fullName,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
    profilePhoto: admin.profilePhoto,
    actorType: ActorType.ADMIN,
  };
}



export function mapAdminLoginResponse(params: {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: IAdmin;
}): IAdminAuthResponse {
  return {
    message: params.message,
    accessToken: params.accessToken,
    refreshToken: params.refreshToken,
    user: mapAdminAuthUser(params.user),
  };
}



