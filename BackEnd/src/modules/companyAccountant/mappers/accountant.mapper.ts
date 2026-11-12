import { IAccountant } from "../model/accountant.model.interface";
import { AccountantAccountResponse,AccountantDto} from "./accountant.mapper.interfaces";


export function mapAccountantAccount(account: {
  _id: { toString(): string };
  email: string;
  fullName: string;
  department: string;
}): AccountantAccountResponse {
  return {
    id: account._id.toString(),
    email: account.email,
    fullName: account.fullName,
    department: account.department,
  };
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
