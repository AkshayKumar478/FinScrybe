"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountantService = void 0;
const types_1 = require("../../../common/types");
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
const accountantProfile_mapper_1 = require("../mappers/accountantProfile.mapper");
const accountant_repository_1 = require("../repositories/accountant.repository");
class AccountantService {
    constructor(repository) {
        this.repository = repository;
    }
    async getProfile(accountantId) {
        const accountant = await this.repository.findById(accountantId);
        if (!accountant) {
            throw new NotFoundError_1.NotFoundError("Accountant not found");
        }
        return (0, accountantProfile_mapper_1.mapAccountantProfile)(accountant);
    }
    async listByCompany(companyId) {
        const accountants = await this.repository.findByCompanyId(companyId);
        return (0, accountantProfile_mapper_1.mapAccountantProfiles)(accountants);
    }
    async listByCompanyForActor(actorType, actorId, companyId) {
        if (actorType === types_1.ActorType.COMPANY_ADMIN) {
            const currentCompanyId = await this.resolveCompanyId(actorType, actorId);
            if (currentCompanyId !== companyId) {
                throw new ForbiddenError_1.ForbiddenError("You can only view accountants in your company");
            }
        }
        return this.listByCompany(companyId);
    }
    async listForCurrentCompany(actorType, actorId) {
        const companyId = await this.resolveCompanyId(actorType, actorId);
        const accountants = await this.repository.findByCompanyId(companyId);
        return (0, accountantProfile_mapper_1.mapAccountantProfiles)(accountants);
    }
    async updateStatus(actorType, actorId, accountantId, isActive) {
        const targetAccountant = await this.repository.findById(accountantId);
        if (!targetAccountant) {
            throw new NotFoundError_1.NotFoundError("Accountant not found");
        }
        if (actorType === types_1.ActorType.COMPANY_ADMIN) {
            const companyId = await this.resolveCompanyId(actorType, actorId);
            if (companyId !== targetAccountant.companyId.toString()) {
                throw new ForbiddenError_1.ForbiddenError("You can only manage accountants in your company");
            }
        }
        const updatedAccountant = await this.repository.setActiveStatus(accountantId, isActive);
        if (!updatedAccountant) {
            throw new NotFoundError_1.NotFoundError("Accountant not found");
        }
        return (0, accountantProfile_mapper_1.mapAccountantProfile)(updatedAccountant);
    }
    async resolveCompanyId(actorType, actorId) {
        if (actorType !== types_1.ActorType.COMPANY_ADMIN) {
            throw new ForbiddenError_1.ForbiddenError("Only company admins have a current company context");
        }
        const actor = await auth_repository_1.authRepository.findActorById(actorType, actorId);
        if (!actor || !("companyId" in actor)) {
            throw new NotFoundError_1.NotFoundError("Company admin not found");
        }
        return actor.companyId.toString();
    }
}
exports.accountantService = new AccountantService(accountant_repository_1.accountantRepository);
