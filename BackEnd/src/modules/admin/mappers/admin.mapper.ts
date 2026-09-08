import { IAdmin } from "../model/admin.model";
import { ActorType } from "../../../common/types";

export interface IAdminAuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    profilePhoto?: string;
  };
}
export interface IAdminProfileDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAdminAuthUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  actorType: ActorType.ADMIN;
}

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



