import { ICompany } from "../model/model";
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



export function mapCompany(company: ICompany): CompanyDto {
  return {
    id: company._id.toString(),
    companyName: company.companyName,
    industry: company.industry,
    companyEmail: company.companyEmail,
    companyPhone: company.companyPhone,
    companyAdminId: company.companyAdminId?.toString(),
    status: company.status,
    approvedBy: company.approvedBy?.toString(),
    approvedAt: company.approvedAt,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
  };
}

export function mapCompanies(companies: ICompany[]): CompanyDto[] {
  return companies.map(mapCompany);
}
