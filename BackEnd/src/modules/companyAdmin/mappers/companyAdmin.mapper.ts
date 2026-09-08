import { ICompanyAdmin } from "../model/model";
import { CompanyAdminRole } from "../../../common/types";

export interface CompanyAdminAccountResponse {
  id: string;
  email: string;
  fullName: string;
  role: CompanyAdminRole;
}

export function mapCompanyAdminAccount(account: {
  _id: { toString(): string };
  email: string;
  fullName: string;
  role: CompanyAdminRole;
}): CompanyAdminAccountResponse {
  return {
    id: account._id.toString(),
    email: account.email,
    fullName: account.fullName,
    role: account.role,
  };
}

export interface CompanyAdminAuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: CompanyAdminAccountResponse;
}

export const mapCompanyAdminLoginResponse = (params: {
  accessToken: string;
  refreshToken: string;
  user: ICompanyAdmin;
}): CompanyAdminAuthResponse => ({
  message: "Company admin login successful",
  accessToken: params.accessToken,
  refreshToken: params.refreshToken,
  user: mapCompanyAdminAccount(params.user),
});
