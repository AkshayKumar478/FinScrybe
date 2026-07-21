"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const admin_repository_1 = require("../repositories/admin.repository");
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const bcrypt_1 = require("../../../common/utils/bcrypt");
const jwt_1 = require("../../../common/utils/jwt");
const types_1 = require("../../../common/types");
const admin_mapper_1 = require("../mappers/admin.mapper");
const constants_1 = require("../../../common/constants/constants");
const jwt_2 = require("../../../common/utils/jwt");
class AdminService {
    constructor(repository) {
        this.repository = repository;
    }
    buildAuthResponse({ message, user, }) {
        const tokens = this.generateTokens(user._id.toString());
        return (0, admin_mapper_1.mapAdminLoginResponse)({
            message,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
        });
    }
    generateTokens(id) {
        const payload = { id, actorType: types_1.ActorType.ADMIN };
        return {
            accessToken: (0, jwt_1.generateAccessToken)(payload),
            refreshToken: (0, jwt_1.generateRefreshToken)(payload),
        };
    }
    async requireValidCredentials(getUser, password) {
        const user = await getUser();
        const hashToCompare = user?.password ?? constants_1.DUMMY_PASSWORD_HASH;
        const isPasswordValid = await (0, bcrypt_1.compareValue)(password, hashToCompare);
        if (!user || !isPasswordValid) {
            throw new UnauthorizedError_1.UnauthorizedError("Invalid email or password");
        }
        return user;
    }
    async login(payload) {
        const admin = await this.requireValidCredentials(() => this.repository.findByEmailWithPassword(payload.email), payload.password);
        const lastLogin = new Date();
        this.repository
            .updateLastLogin(admin._id.toString(), lastLogin)
            .catch(() => undefined);
        return this.buildAuthResponse({
            message: "Super admin login successful",
            user: admin,
        });
    }
    async refreshToken(refreshToken) {
        const payload = (0, jwt_2.verifyRefreshToken)(refreshToken);
        const admin = await this.repository.findById(payload.id);
        if (!admin) {
            throw new UnauthorizedError_1.UnauthorizedError("Invalid refresh token");
        }
        return this.generateTokens(admin._id.toString());
    }
}
exports.adminService = new AdminService(admin_repository_1.adminRepository);
