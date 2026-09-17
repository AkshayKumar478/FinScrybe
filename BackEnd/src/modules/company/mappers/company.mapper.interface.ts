import { CompanyStatus } from "../../../common/types";


export interface CompanyDto {
  id: string;
  companyName: string;
  industry: string;
  companyEmail: string;
  companyPhone: string;
  companyAdminId?: string;
  status: string;
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthCompanyResponse {
  id: string;
  companyName: string;
  companyEmail: string;
  status: CompanyStatus;
}

export interface CompanyRegistrationResponse {
  message: string;
  company: AuthCompanyResponse;
  companyAdmin: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

