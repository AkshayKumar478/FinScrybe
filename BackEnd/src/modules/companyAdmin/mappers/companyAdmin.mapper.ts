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
