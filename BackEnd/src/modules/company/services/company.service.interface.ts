import { ActorType, CompanyStatus } from "../../../common/types";

import { CompanyDto, CompanyRegistrationResponse,RegistrationStartResponse } from "../mappers/company.mapper.interface";

import { CompanyRegistrationInput } from  "../validators/company.validation";


export interface ICompanyService {
  startRegistration(payload:CompanyRegistrationInput):RegistrationStartResponse
  listAll(): Promise<CompanyDto[]>;
  listPending(): Promise<CompanyDto[]>;
  getById(companyId: string): Promise<CompanyDto>;
  getCurrentUsersCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<CompanyDto>;
  updateStatus(
    companyId: string,
    status: CompanyStatus,
    approvedBy: string
  ): Promise<CompanyDto>;
}
