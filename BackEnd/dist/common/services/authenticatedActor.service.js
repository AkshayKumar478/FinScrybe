"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedActorService = exports.AuthenticatedActorService = void 0;
const types_1 = require("../types");
const admin_repository_1 = require("../../modules/admin/repositories/admin.repository");
const companyAdmin_repository_1 = require("../../modules/companyAdmin/repositories/companyAdmin.repository");
const accountant_repository_1 = require("../../modules/companyAccountant/repositories/accountant.repository");
class AuthenticatedActorService {
    async findActor(actorType, id) {
        switch (actorType) {
            case types_1.ActorType.ADMIN:
                return admin_repository_1.adminRepository.findById(id);
            case types_1.ActorType.COMPANY_ADMIN:
                return companyAdmin_repository_1.companyAdminRepository.findById(id);
            case types_1.ActorType.ACCOUNTANT:
                return accountant_repository_1.accountantRepository.findById(id);
        }
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
}
exports.AuthenticatedActorService = AuthenticatedActorService;
exports.authenticatedActorService = new AuthenticatedActorService();
