import { IAdmin } from "../model/admin.model";

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
