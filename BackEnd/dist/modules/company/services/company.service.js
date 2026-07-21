"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyService = void 0;
const types_1 = require("../../../common/types");
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const company_repository_1 = require("../repositories/company.repository");
const company_mapper_1 = require("../mappers/company.mapper");
const companyAdmin_repository_1 = require("../../companyAdmin/repositories/companyAdmin.repository");
const mongoose_1 = __importDefault(require("mongoose"));
const authenticatedActor_service_1 = require("../../../common/services/authenticatedActor.service");
const ConflictError_1 = require("../../../common/errors/ConflictError");
const bcrypt_1 = require("../../../common/utils/bcrypt");
class CompanyService {
    constructor(repository, companyAdminRepo) {
        this.repository = repository;
        this.companyAdminRepo = companyAdminRepo;
    }
    async assertCompanyRegistrationAvailability(payload) {
        const [existingCompany, existingCompanyAdmin] = await Promise.all([
            this.repository.findCompanyByEmail(payload.companyEmail),
            this.companyAdminRepo.findByEmail(payload.adminEmail),
        ]);
        if (existingCompany) {
            throw new ConflictError_1.ConflictError("Company email is already registered");
        }
        if (existingCompanyAdmin) {
            throw new ConflictError_1.ConflictError("Company admin email is already registered");
        }
    }
    async createCompanyRegistration(payload) {
        const session = await mongoose_1.default.startSession();
        try {
            let company = null;
            let companyAdmin = null;
            await session.withTransaction(async () => {
                company = await this.repository.create(payload.company, { session });
                companyAdmin = await this.companyAdminRepo.create({
                    companyId: company._id,
                    fullName: payload.companyAdmin.fullName,
                    email: payload.companyAdmin.email,
                    password: payload.companyAdmin.password,
                    phoneNumber: payload.companyAdmin.phoneNumber,
                    isPrimaryAdmin: true,
                }, { session });
                await this.repository.assignCompanyAdmin(company._id.toString(), companyAdmin._id, { session, new: true });
            });
            if (!company || !companyAdmin) {
                throw new Error("Company registration transaction did not complete");
            }
            return { company, companyAdmin };
        }
        catch (error) {
            if (isDuplicateKeyError(error)) {
                throw new ConflictError_1.ConflictError("Company or company admin already exists");
            }
            throw error;
        }
        finally {
            await session.endSession();
        }
    }
    async registerCompany(payload) {
        await this.assertCompanyRegistrationAvailability(payload);
        const hashedPassword = await (0, bcrypt_1.hashValue)(payload.adminPassword);
        const { company, companyAdmin } = await this.createCompanyRegistration({
            company: {
                companyName: payload.companyName,
                industry: payload.industry,
                companyEmail: payload.companyEmail,
                companyPhone: payload.companyPhone,
            },
            companyAdmin: {
                fullName: payload.adminFullName,
                email: payload.adminEmail,
                password: hashedPassword,
                phoneNumber: payload.adminPhoneNumber,
            },
        });
        return (0, company_mapper_1.mapCompanyRegistrationResponse)(company, companyAdmin);
    }
    async listAll() {
        const companies = await this.repository.findMany();
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
            const actor = await authenticatedActor_service_1.authenticatedActorService.findActorById(actorType, actorId);
            if (!actor || !("companyId" in actor)) {
                throw new ForbiddenError_1.ForbiddenError("Company admin is not linked to a company");
            }
            return this.repository.findById(actor.companyId.toString());
        }
        if (actorType === types_1.ActorType.ACCOUNTANT) {
            const actor = await authenticatedActor_service_1.authenticatedActorService.findActorById(actorType, actorId);
            if (!actor || !("companyId" in actor)) {
                throw new ForbiddenError_1.ForbiddenError("Accountant is not linked to a company");
            }
            return this.repository.findById(actor.companyId.toString());
        }
        throw new ForbiddenError_1.ForbiddenError("This actor type has no scoped company");
    }
}
const isDuplicateKeyError = (error) => {
    return (error instanceof mongoose_1.default.mongo.MongoServerError &&
        error.code === 11000);
};
exports.companyService = new CompanyService(company_repository_1.companyRepository, companyAdmin_repository_1.companyAdminRepository);
