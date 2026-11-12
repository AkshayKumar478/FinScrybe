import type { AccountantAccountResponse, AccountantLoginResponse } from "../mappers/accountant.mapper.interfaces";
import type { AcceptInvitationInput, AccountantLoginInput } from "../validators/accountant.validation";
import { AccountantDto } from "../mappers/accountant.mapper.interfaces";
export interface IAccountantService {
  acceptInvitation(payload: AcceptInvitationInput): Promise<AccountantAccountResponse>;

  login(payload: AccountantLoginInput): Promise<{
    accountant: Omit<AccountantLoginResponse, "accessToken" | "refreshToken">;
    accessToken: string;
    refreshToken: string;
  }>;
   listMyCompany(companyId: string): Promise<AccountantDto[]>;
}