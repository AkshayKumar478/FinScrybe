"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const ConflictError_1 = require("../../../common/errors/ConflictError");
const ForbiddenError_1 = require("../../../common/errors/ForbiddenError");
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const bcrypt_1 = require("../../../common/utils/bcrypt");
const jwt_1 = require("../../../common/utils/jwt");
const types_1 = require("../../../common/types");
const auth_repository_1 = require("../repositories/auth.repository");
const auth_mapper_1 = require("../mappers/auth.mapper");
const DUMMY_PASSWORD_HASH = "$2b$10$7kB3K0m2v7Qx0m2Z8wR5euE0r1w6m9j6W5Qwq0Q0h3H2mD8A3VnQK";
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
    async loginCompanyAdmin(payload) {
        const companyAdmin = await this.requireValidCredentials(() => this.repository.findCompanyAdminByEmail(payload.email), payload.password);
        this.assertActiveAccount(companyAdmin.isActive, "Company admin account is inactive");
        const company = await this.requireApprovedCompany(companyAdmin.companyId.toString());
        const lastLogin = new Date();
        this.repository
            .updateCompanyAdminLastLogin(companyAdmin._id.toString(), lastLogin)
            .catch(() => undefined);
        return this.buildAuthResponse({
            message: "Company admin login successful",
            actorType: types_1.ActorType.COMPANY_ADMIN,
            user: companyAdmin,
            company,
        });
    }
    async loginAccountant(payload) {
        const accountant = await this.requireValidCredentials(() => this.repository.findAccountantByEmail(payload.email), payload.password);
        this.assertActiveAccount(accountant.isActive, "Accountant account is inactive");
        const company = await this.requireApprovedCompany(accountant.companyId.toString());
        const lastLogin = new Date();
        this.repository
            .updateAccountantLastLogin(accountant._id.toString(), lastLogin)
            .catch(() => undefined);
        return this.buildAuthResponse({
            message: "Accountant login successful",
            actorType: types_1.ActorType.ACCOUNTANT,
            user: accountant,
            company,
        });
    }
    async assertCompanyRegistrationAvailability(payload) {
        const [existingCompany, existingCompanyAdmin] = await Promise.all([
            this.repository.findCompanyByEmail(payload.companyEmail),
            this.repository.findCompanyAdminByEmail(payload.adminEmail),
        ]);
        if (existingCompany) {
            throw new ConflictError_1.ConflictError("Company email is already registered");
        }
        if (existingCompanyAdmin) {
            throw new ConflictError_1.ConflictError("Company admin email is already registered");
        }
    }
    async requireValidCredentials(getUser, password) {
        const user = await getUser();
        const hashToCompare = user?.password ?? DUMMY_PASSWORD_HASH;
        const isPasswordValid = await (0, bcrypt_1.compareValue)(password, hashToCompare);
        if (!user || !isPasswordValid) {
            throw new UnauthorizedError_1.UnauthorizedError("Invalid email or password");
        }
        return user;
    }
    assertActiveAccount(isActive, message) {
        if (!isActive) {
            throw new ForbiddenError_1.ForbiddenError(message);
        }
    }
    async requireApprovedCompany(companyId) {
        const company = await this.repository.findCompanyById(companyId);
        if (!company || company.status !== types_1.CompanyStatus.APPROVED) {
            throw new ForbiddenError_1.ForbiddenError("Company is not approved to access the platform");
        }
        return company;
    }
    buildAuthResponse({ message, actorType, user, company, }) {
        const tokens = this.generateTokens(user._id.toString(), actorType);
        return (0, auth_mapper_1.mapAuthResponse)({
            message,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            actorType,
            user,
            company,
        });
    }
    generateTokens(id, actorType) {
        const payload = { id, actorType };
        return {
            accessToken: (0, jwt_1.generateAccessToken)(payload),
            refreshToken: (0, jwt_1.generateRefreshToken)(payload),
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService(auth_repository_1.authRepository);
