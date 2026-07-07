"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminService = void 0;
const types_1 = require("../../../common/types");
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
const companyAdminProfile_mapper_1 = require("../mappers/companyAdminProfile.mapper");
const companyAdmin_repository_1 = require("../repositories/companyAdmin.repository");
class CompanyAdminService {
    constructor(repository) {
        this.repository = repository;
    }
    async getProfile(companyAdminId) {
        const companyAdmin = await this.repository.findById(companyAdminId);
        if (!companyAdmin) {
            throw new NotFoundError_1.NotFoundError("Company admin not found");
        }
        return (0, companyAdminProfile_mapper_1.mapCompanyAdminProfile)(companyAdmin);
    }
    async listByCompany(companyId) {
        const companyAdmins = await this.repository.findByCompanyId(companyId);
        return (0, companyAdminProfile_mapper_1.mapCompanyAdminProfiles)(companyAdmins);
    }
    async listForCurrentCompany(actorType, actorId) {
        const companyId = await this.resolveCompanyId(actorType, actorId);
        const companyAdmins = await this.repository.findByCompanyId(companyId);
        return (0, companyAdminProfile_mapper_1.mapCompanyAdminProfiles)(companyAdmins);
    }
    async updateStatus(actorType, actorId, targetCompanyAdminId, isActive) {
        const targetCompanyAdmin = await this.repository.findById(targetCompanyAdminId);
        if (!targetCompanyAdmin) {
            throw new NotFoundError_1.NotFoundError("Company admin not found");
        }
        if (targetCompanyAdmin.isPrimaryAdmin && !isActive) {
            throw new ForbiddenError_1.ForbiddenError("Primary company admin cannot be deactivated");
        }
        if (actorType === types_1.ActorType.COMPANY_ADMIN) {
            const actor = await this.repository.findById(actorId);
            if (!actor) {
                throw new NotFoundError_1.NotFoundError("Company admin not found");
            }
            if (actor.companyId.toString() !== targetCompanyAdmin.companyId.toString()) {
                throw new ForbiddenError_1.ForbiddenError("You can only manage company admins in your company");
            }
        }
        const updatedCompanyAdmin = await this.repository.setActiveStatus(targetCompanyAdminId, isActive);
        if (!updatedCompanyAdmin) {
            throw new NotFoundError_1.NotFoundError("Company admin not found");
        }
        return (0, companyAdminProfile_mapper_1.mapCompanyAdminProfile)(updatedCompanyAdmin);
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
exports.companyAdminService = new CompanyAdminService(companyAdmin_repository_1.companyAdminRepository);
