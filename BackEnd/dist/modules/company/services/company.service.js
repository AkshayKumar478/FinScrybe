"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyService = void 0;
const types_1 = require("../../../common/types");
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const company_repository_1 = require("../repositories/company.repository");
const auth_repository_1 = require("../../auth/repositories/auth.repository");
const company_mapper_1 = require("../mappers/company.mapper");
class CompanyService {
    constructor(repository) {
        this.repository = repository;
    }
    async listAll() {
        const companies = await this.repository.findAll();
        return (0, company_mapper_1.mapCompanies)(companies);
    }
    async listPending() {
        const companies = await this.repository.findByStatus(types_1.CompanyStatus.PENDING);
        return (0, company_mapper_1.mapCompanies)(companies);
    }
    async getById(companyId) {
        const company = await this.repository.findById(companyId);
        if (!company) {
            throw new NotFoundError_1.NotFoundError("Company not found");
        }
        return (0, company_mapper_1.mapCompany)(company);
    }
    async getCurrentUsersCompany(actorType, actorId) {
        const company = await this.resolveCompanyForActor(actorType, actorId);
        if (!company) {
            throw new NotFoundError_1.NotFoundError("Company not found");
        }
        return (0, company_mapper_1.mapCompany)(company);
    }
    async updateStatus(companyId, status, approvedBy) {
        const company = await this.repository.findById(companyId);
        if (!company) {
            throw new NotFoundError_1.NotFoundError("Company not found");
        }
        const nextApprovedBy = status === types_1.CompanyStatus.APPROVED ? approvedBy : undefined;
        const nextApprovedAt = status === types_1.CompanyStatus.APPROVED ? new Date() : undefined;
        const updatedCompany = await this.repository.updateStatus(companyId, status, nextApprovedBy, nextApprovedAt);
        if (!updatedCompany) {
            throw new NotFoundError_1.NotFoundError("Company not found");
        }
        return (0, company_mapper_1.mapCompany)(updatedCompany);
    }
    async resolveCompanyForActor(actorType, actorId) {
        if (actorType === types_1.ActorType.COMPANY_ADMIN) {
            const actor = await auth_repository_1.authRepository.findActorById(actorType, actorId);
            if (!actor || !("companyId" in actor)) {
                throw new ForbiddenError_1.ForbiddenError("Company admin is not linked to a company");
            }
            return this.repository.findById(actor.companyId.toString());
        }
        if (actorType === types_1.ActorType.ACCOUNTANT) {
            const actor = await auth_repository_1.authRepository.findActorById(actorType, actorId);
            if (!actor || !("companyId" in actor)) {
                throw new ForbiddenError_1.ForbiddenError("Accountant is not linked to a company");
            }
            return this.repository.findById(actor.companyId.toString());
        }
        throw new ForbiddenError_1.ForbiddenError("This actor type has no scoped company");
    }
}
exports.companyService = new CompanyService(company_repository_1.companyRepository);
