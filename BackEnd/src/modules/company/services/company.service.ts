import { ActorType, CompanyStatus } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { companyRepository, ICompanyRepository } from "../repositories/company.repository";
import { authRepository } from "../../auth/repositories/auth.repository";
import { CompanyDto, mapCompanies, mapCompany } from "../mappers/company.mapper";

class CompanyService {
  constructor(private readonly repository: ICompanyRepository) {}

  async listAll(): Promise<CompanyDto[]> {
    const companies = await this.repository.findAll();
    return mapCompanies(companies);
  }

  async listPending(): Promise<CompanyDto[]> {
    const companies = await this.repository.findByStatus(CompanyStatus.PENDING);
    return mapCompanies(companies);
  }

  async getById(companyId: string): Promise<CompanyDto> {
    const company = await this.repository.findById(companyId);

    if (!company) {
      throw new NotFoundError("Company not found");
    }

    return mapCompany(company);
  }

  async getCurrentUsersCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<CompanyDto> {
    const company = await this.resolveCompanyForActor(actorType, actorId);

    if (!company) {
      throw new NotFoundError("Company not found");
    }

    return mapCompany(company);
  }

  async updateStatus(
    companyId: string,
    status: CompanyStatus,
    approvedBy: string
  ): Promise<CompanyDto> {
    const company = await this.repository.findById(companyId);

    if (!company) {
      throw new NotFoundError("Company not found");
    }

    const nextApprovedBy =
      status === CompanyStatus.APPROVED ? approvedBy : undefined;
    const nextApprovedAt =
      status === CompanyStatus.APPROVED ? new Date() : undefined;

    const updatedCompany = await this.repository.updateStatus(
      companyId,
      status,
      nextApprovedBy,
      nextApprovedAt
    );

    if (!updatedCompany) {
      throw new NotFoundError("Company not found");
    }

    return mapCompany(updatedCompany);
  }

  private async resolveCompanyForActor(
    actorType: ActorType,
    actorId: string
  ) {
    if (actorType === ActorType.COMPANY_ADMIN) {
      const actor = await authRepository.findActorById(actorType, actorId);

      if (!actor || !("companyId" in actor)) {
        throw new ForbiddenError("Company admin is not linked to a company");
      }

      return this.repository.findById(actor.companyId.toString());
    }

    if (actorType === ActorType.ACCOUNTANT) {
      const actor = await authRepository.findActorById(actorType, actorId);

      if (!actor || !("companyId" in actor)) {
        throw new ForbiddenError("Accountant is not linked to a company");
      }

      return this.repository.findById(actor.companyId.toString());
    }

    throw new ForbiddenError("This actor type has no scoped company");
  }
}

export const companyService = new CompanyService(companyRepository);
