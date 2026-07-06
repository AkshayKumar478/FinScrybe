"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = exports.AuthRepository = void 0;
const admin_repository_1 = require("../../admin/repositories/admin.repository");
const company_repository_1 = require("../../company/repositories/company.repository");
const accountant_repository_1 = require("../../companyAccountant/repositories/accountant.repository");
const companyAdmin_repository_1 = require("../../companyAdmin/repositories/companyAdmin.repository");
const types_1 = require("../../../common/types");
const mongoose_1 = __importDefault(require("mongoose"));
const ConflictError_1 = require("../../../common/errors/ConflictError");
class AuthRepository {
    async findSuperAdminByEmail(email) {
        return admin_repository_1.adminRepository.findByEmailWithPassword(email);
    }
    async updateSuperAdminLastLogin(id, lastLogin) {
        return admin_repository_1.adminRepository.updateLastLogin(id, lastLogin);
    }
    async findCompanyByEmail(email) {
        return company_repository_1.companyRepository.findByEmail(email);
    }
    async findCompanyById(id) {
        return company_repository_1.companyRepository.findById(id);
    }
    async findCompanyAdminByEmail(email) {
        return companyAdmin_repository_1.companyAdminRepository.findByEmailWithPassword(email);
    }
    async updateCompanyAdminLastLogin(id, lastLogin) {
        return companyAdmin_repository_1.companyAdminRepository.updateLastLogin(id, lastLogin);
    }
    async findAccountantByEmail(email) {
        return accountant_repository_1.accountantRepository.findByEmailWithPassword(email);
    }
    async updateAccountantLastLogin(id, lastLogin) {
        return accountant_repository_1.accountantRepository.updateLastLogin(id, lastLogin);
    }
    async findActorByEmail(actorType, email) {
        switch (actorType) {
            case types_1.ActorType.ADMIN:
                return admin_repository_1.adminRepository.findByEmail(email);
            case types_1.ActorType.COMPANY_ADMIN:
                return companyAdmin_repository_1.companyAdminRepository.findByEmail(email);
            case types_1.ActorType.ACCOUNTANT:
                return accountant_repository_1.accountantRepository.findByEmail(email);
            default:
                return null;
        }
    }
    async updateActorPassword(actorType, actorId, password) {
        switch (actorType) {
            case types_1.ActorType.ADMIN:
                return admin_repository_1.adminRepository.updateById(actorId, { password });
            case types_1.ActorType.COMPANY_ADMIN:
                return companyAdmin_repository_1.companyAdminRepository.updateById(actorId, { password });
            case types_1.ActorType.ACCOUNTANT:
                return accountant_repository_1.accountantRepository.updateById(actorId, { password });
            default:
                return null;
        }
    }
    async findActorById(actorType, actorId) {
        switch (actorType) {
            case types_1.ActorType.ADMIN:
                return admin_repository_1.adminRepository.findById(actorId);
            case types_1.ActorType.COMPANY_ADMIN:
                return companyAdmin_repository_1.companyAdminRepository.findById(actorId);
            case types_1.ActorType.ACCOUNTANT:
                return accountant_repository_1.accountantRepository.findById(actorId);
            default:
                return null;
        }
    }
    async createCompanyRegistration(payload) {
        const session = await mongoose_1.default.startSession();
        try {
            let company = null;
            let companyAdmin = null;
            await session.withTransaction(async () => {
                company = await company_repository_1.companyRepository.create(payload.company, { session });
                companyAdmin = await companyAdmin_repository_1.companyAdminRepository.create({
                    companyId: company._id,
                    fullName: payload.companyAdmin.fullName,
                    email: payload.companyAdmin.email,
                    password: payload.companyAdmin.password,
                    phoneNumber: payload.companyAdmin.phoneNumber,
                    isPrimaryAdmin: true,
                }, { session });
                await company_repository_1.companyRepository.assignCompanyAdmin(company._id.toString(), companyAdmin._id, { session, new: true });
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
}
exports.AuthRepository = AuthRepository;
exports.authRepository = new AuthRepository();
const isDuplicateKeyError = (error) => {
    return (error instanceof mongoose_1.default.mongo.MongoServerError &&
        error.code === 11000);
};
