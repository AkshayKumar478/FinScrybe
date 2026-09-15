
import { ActorType } from "../../../common/types"

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
