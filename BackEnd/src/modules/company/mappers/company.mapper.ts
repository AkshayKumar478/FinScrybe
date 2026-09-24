import { ICompany } from "../model/model.interface";
import { ICompanySummary } from "../contracts";
import { IActiveActor } from "../../../common/contracts/actorContracts";
import {CompanyDto,CompanyRegistrationResponse,AuthCompanyResponse,RegistrationStartResponse} from './company.mapper.interface'
import {CompanyRegistrationMessage} from '../../../common/constants/messages'
import {ICompanyRegistrationStaging} from '../model/registrationStaging.model.interface'
import  {ICompanyRegistrationPayload} from '../contracts'


export function mapCompany(company: ICompany): CompanyDto {
  return {
    id: company._id.toString(),
    companyName: company.companyName,
    industry: company.industry,
    companyEmail: company.companyEmail,
    companyPhone: company.companyPhone,
    gstin: company.gstin,
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
    gstin: company.gstin,
    status: company.status,
  };
}

export function mapRegistrationStartResponse(
  registrationId: string,
  message: string
): RegistrationStartResponse {
  return {
    registrationId,
    message,
  };
}

export function mapCompanyRegistrationResponse(
  company: ICompanySummary,
  companyAdmin: IActiveActor
): CompanyRegistrationResponse {
  return {
    message: CompanyRegistrationMessage.REGISTRATION_SUBMITTED_SUCCESS ,
    company: mapCompanySummary(company),
    companyAdmin: {
      id: companyAdmin._id.toString(),
      fullName: companyAdmin.fullName,
      email: companyAdmin.email,
      phoneNumber: companyAdmin.phoneNumber,
    },
  };
}

export function mapStagingToRegistrationPayload(
  staging: ICompanyRegistrationStaging
): ICompanyRegistrationPayload {
  return {
    company: {
      companyName: staging.companyName,
      industry: staging.industry,
      companyEmail: staging.companyEmail,
      companyPhone: staging.companyPhone,
      gstin: staging.gstin,
    },

    companyAdmin: {
      fullName: staging.adminFullName,
      email: staging.adminEmail,
      password: staging.adminPassword,
      phoneNumber: staging.adminPhoneNumber,
    },
  };
}


export function mapCompanies(companies: ICompany[]): CompanyDto[] {
  return companies.map(mapCompany);
}
