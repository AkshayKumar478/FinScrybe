import { ICompany } from "../model/model.interface";
import { CompanyStatus } from "../../../common/types";
import { ICompanySummary } from "../contracts";
import { IActiveActor } from "../../../common/contracts/actorContracts";
import {CompanyDto,CompanyRegistrationResponse,AuthCompanyResponse} from './company.mapper.interface'


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
export function mapCompanySummary(
  company: ICompanySummary
): AuthCompanyResponse {
  return {
    id: company._id.toString(),
    companyName: company.companyName,
    companyEmail: company.companyEmail,
    status: company.status,
  };
}
export function mapCompanyRegistrationResponse(
  company: ICompanySummary,
  companyAdmin: IActiveActor
): CompanyRegistrationResponse {
  return {
    message: "Company registration submitted successfully",
    company: mapCompanySummary(company),
    companyAdmin: {
      id: companyAdmin._id.toString(),
      fullName: companyAdmin.fullName,
      email: companyAdmin.email,
      phoneNumber: companyAdmin.phoneNumber,
    },
  };
}

export function mapCompanies(companies: ICompany[]): CompanyDto[] {
  return companies.map(mapCompany);
}
