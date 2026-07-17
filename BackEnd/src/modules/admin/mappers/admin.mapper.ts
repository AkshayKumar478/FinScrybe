import { IAdmin } from "../model/admin.model";
import { ActorType } from "../../../common/types";
export interface AdminAuthResponse {
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
export interface AdminProfileDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface AdminAuthUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
}

export function mapAdminAuthUser(
  admin: IAdmin
): AdminAuthUser {
  return {
    id: admin._id.toString(),
    fullName: admin.fullName,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
    profilePhoto: admin.profilePhoto,
  };
}



export function mapAdminLoginResponse(params: {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: IAdmin;
}): AdminAuthResponse {
  return {
    message: params.message,
    accessToken: params.accessToken,
    refreshToken: params.refreshToken,
    user: mapAdminAuthUser(params.user),
  };
}



export function mapAdminProfile(admin: IAdmin): AdminProfileDto {
  return {
    id: admin._id.toString(),
    fullName: admin.fullName,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
    profilePhoto: admin.profilePhoto,
    isActive: admin.isActive,
    lastLogin: admin.lastLogin,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}