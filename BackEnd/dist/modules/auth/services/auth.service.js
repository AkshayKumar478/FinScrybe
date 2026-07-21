"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcrypt_1 = require("../../../common/utils/bcrypt");
const types_1 = require("../../../common/types");
const auth_repository_1 = require("../repositories/auth.repository");
const auth_mapper_1 = require("../mappers/auth.mapper");
class AuthService {
    constructor(repository) {
        this.repository = repository;
    }
    async loginSuperAdmin(payload) {
        const admin = await this.requireValidCredentials(() => this.repository.findSuperAdminByEmail(payload.email), payload.password);
        this.assertActiveAccount(admin.isActive, "Super admin account is inactive");
        const lastLogin = new Date();
        this.repository
            .updateSuperAdminLastLogin(admin._id.toString(), lastLogin)
            .catch(() => undefined);
        return this.buildAuthResponse({
            message: "Super admin login successful",
            actorType: types_1.ActorType.ADMIN,
            user: admin,
        });
    }
    async registerCompany(payload) {
        await this.assertCompanyRegistrationAvailability(payload);
        const hashedPassword = await (0, bcrypt_1.hashValue)(payload.adminPassword);
        const { company, companyAdmin } = await this.repository.createCompanyRegistration({
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
        return (0, auth_mapper_1.mapCompanyRegistrationResponse)(company, companyAdmin);
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService(auth_repository_1.authRepository);
