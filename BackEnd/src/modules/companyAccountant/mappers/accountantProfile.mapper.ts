import { IAccountant } from "../model/accountantModel";

export interface AccountantDto {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  profilePhoto?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function mapAccountantProfile(accountant: IAccountant): AccountantDto {
  return {
    id: accountant._id.toString(),
    companyId: accountant.companyId.toString(),
    fullName: accountant.fullName,
    email: accountant.email,
    phoneNumber: accountant.phoneNumber,
    department: accountant.department,
    profilePhoto: accountant.profilePhoto,
    isActive: accountant.isActive,
    lastLogin: accountant.lastLogin,
    createdAt: accountant.createdAt,
    updatedAt: accountant.updatedAt,
  };
}

export function mapAccountantProfiles(
  accountants: IAccountant[]
): AccountantDto[] {
  return accountants.map(mapAccountantProfile);
}
