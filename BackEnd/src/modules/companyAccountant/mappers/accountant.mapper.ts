export interface AccountantAccountResponse {
  id: string;
  email: string;
  fullName: string;
  department: string;
}

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
