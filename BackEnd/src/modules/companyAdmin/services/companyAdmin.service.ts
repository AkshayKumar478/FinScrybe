import { ActorType } from "../../../common/types";
import { ForbiddenError } from "../../../common/errors/ForbiddenError";
import { NotFoundError } from "../../../common/errors/NotFoundError";
import { authRepository } from "../../auth/repositories/auth.repository";
import {
  CompanyAdminDto,
  mapCompanyAdminProfile,
  mapCompanyAdminProfiles,
} from "../mappers/companyAdminProfile.mapper";
import {
  companyAdminRepository,
  ICompanyAdminRepository,
} from "../repositories/companyAdmin.repository";

class CompanyAdminService {
  constructor(private readonly repository: ICompanyAdminRepository) {}

  async getProfile(companyAdminId: string): Promise<CompanyAdminDto> {
    const companyAdmin = await this.repository.findById(companyAdminId);

    if (!companyAdmin) {
      throw new NotFoundError("Company admin not found");
    }

    return mapCompanyAdminProfile(companyAdmin);
  }

  async listByCompany(companyId: string): Promise<CompanyAdminDto[]> {
    const companyAdmins = await this.repository.findByCompanyId(companyId);
    return mapCompanyAdminProfiles(companyAdmins);
  }

  async listForCurrentCompany(
    actorType: ActorType,
    actorId: string
  ): Promise<CompanyAdminDto[]> {
    const companyId = await this.resolveCompanyId(actorType, actorId);
    const companyAdmins = await this.repository.findByCompanyId(companyId);

    return mapCompanyAdminProfiles(companyAdmins);
  }

  async updateStatus(
    actorType: ActorType,
    actorId: string,
    targetCompanyAdminId: string,
    isActive: boolean
  ): Promise<CompanyAdminDto> {
    const targetCompanyAdmin = await this.repository.findById(targetCompanyAdminId);

    if (!targetCompanyAdmin) {
      throw new NotFoundError("Company admin not found");
    }

    if (targetCompanyAdmin.isPrimaryAdmin && !isActive) {
      throw new ForbiddenError("Primary company admin cannot be deactivated");
    }

    if (actorType === ActorType.COMPANY_ADMIN) {
      const actor = await this.repository.findById(actorId);

      if (!actor) {
        throw new NotFoundError("Company admin not found");
      }

      if (actor.companyId.toString() !== targetCompanyAdmin.companyId.toString()) {
        throw new ForbiddenError("You can only manage company admins in your company");
      }
    }

    const updatedCompanyAdmin = await this.repository.setActiveStatus(
      targetCompanyAdminId,
      isActive
    );

    if (!updatedCompanyAdmin) {
      throw new NotFoundError("Company admin not found");
    }

    return mapCompanyAdminProfile(updatedCompanyAdmin);
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

export const companyAdminService = new CompanyAdminService(
  companyAdminRepository
);
