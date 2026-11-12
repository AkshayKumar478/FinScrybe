import { IAccountant } from "../model/accountant.model.interface";

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

export interface AccountantAccountResponse {
  id: string;
  email: string;
  fullName: string;
  department: string;
}

export interface AccountantLoginResponse {
  id: string;
  email: string;
  fullName: string;
  department: string;
  accessToken: string;
  refreshToken: string;
}


export interface AccountantAccountResponse {
  id: string;
  email: string;
  fullName: string;
  department: string;
}

export interface AccountantLoginServiceResponse {
  accountant: AccountantAccountResponse;
  accessToken: string;
  refreshToken: string;
}
