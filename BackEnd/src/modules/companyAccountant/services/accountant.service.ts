import { ActorType } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { authRepository } from "../../auth/repositories/auth.repository";
import {
  AccountantDto,
  mapAccountantProfile,
  mapAccountantProfiles,
} from "../mappers/accountantProfile.mapper";
import {
  accountantRepository,
  IAccountantRepository,
} from "../repositories/accountant.repository";

class AccountantService {
  constructor(private readonly repository: IAccountantRepository) {}

  async getProfile(accountantId: string): Promise<AccountantDto> {
    const accountant = await this.repository.findById(accountantId);

    if (!accountant) {
      throw new NotFoundError("Accountant not found");
    }

    return mapAccountantProfile(accountant);
  }

  async listByCompany(companyId: string): Promise<AccountantDto[]> {
    const accountants = await this.repository.findByCompanyId(companyId);
    return mapAccountantProfiles(accountants);
  }

  async listByCompanyForActor(
    actorType: ActorType,
    actorId: string,
    companyId: string
  ): Promise<AccountantDto[]> {
    if (actorType === ActorType.COMPANY_ADMIN) {
      const currentCompanyId = await this.resolveCompanyId(actorType, actorId);

      if (currentCompanyId !== companyId) {
        throw new ForbiddenError("You can only view accountants in your company");
      }
    }

    return this.listByCompany(companyId);
  }

  async listForCurrentCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<AccountantDto[]> {
    const companyId = await this.resolveCompanyId(actorType, actorId);
    const accountants = await this.repository.findByCompanyId(companyId);

    return mapAccountantProfiles(accountants);
  }

  async updateStatus(
    actorType: ActorType,
    actorId: string,
    accountantId: string,
    isActive: boolean
  ): Promise<AccountantDto> {
    const targetAccountant = await this.repository.findById(accountantId);

    if (!targetAccountant) {
      throw new NotFoundError("Accountant not found");
    }

    if (actorType === ActorType.COMPANY_ADMIN) {
      const companyId = await this.resolveCompanyId(actorType, actorId);

      if (companyId !== targetAccountant.companyId.toString()) {
        throw new ForbiddenError("You can only manage accountants in your company");
      }
    }

    const updatedAccountant = await this.repository.setActiveStatus(
      accountantId,
      isActive
    );

    if (!updatedAccountant) {
      throw new NotFoundError("Accountant not found");
    }

    return mapAccountantProfile(updatedAccountant);
  }

  private async resolveCompanyId(
    actorType: ActorType,
    actorId: string
  ): Promise<string> {
    if (actorType !== ActorType.COMPANY_ADMIN) {
      throw new ForbiddenError("Only company admins have a current company context");
    }

    const actor = await authRepository.findActorById(actorType, actorId);

    if (!actor || !("companyId" in actor)) {
      throw new NotFoundError("Company admin not found");
    }

    return actor.companyId.toString();
  }
}

export const accountantService = new AccountantService(accountantRepository);
