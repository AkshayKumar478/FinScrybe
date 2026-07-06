import { ICompanyAdmin } from "../model/model";

export interface CompanyAdminDto {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  role: string;
  invitedBy?: string;
  isPrimaryAdmin: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function mapCompanyAdminProfile(
  companyAdmin: ICompanyAdmin
): CompanyAdminDto {
  return {
    id: companyAdmin._id.toString(),
    companyId: companyAdmin.companyId.toString(),
    fullName: companyAdmin.fullName,
    email: companyAdmin.email,
    phoneNumber: companyAdmin.phoneNumber,
    profilePhoto: companyAdmin.profilePhoto,
    role: companyAdmin.role,
    invitedBy: companyAdmin.invitedBy?.toString(),
    isPrimaryAdmin: companyAdmin.isPrimaryAdmin,
    isActive: companyAdmin.isActive,
    lastLogin: companyAdmin.lastLogin,
    createdAt: companyAdmin.createdAt,
    updatedAt: companyAdmin.updatedAt,
  };
}

export function mapCompanyAdminProfiles(
  companyAdmins: ICompanyAdmin[]
): CompanyAdminDto[] {
  return companyAdmins.map(mapCompanyAdminProfile);
}
