"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetRepository = exports.PasswordResetRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const passwordResetModel_1 = require("../models/passwordResetModel");
class PasswordResetRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(passwordResetModel_1.PasswordReset);
    }
    async findByToken(token) {
        return this.findOne({ token });
    }
    async findActiveByToken(token) {
        return this.findOne({
            token,
            isUsed: false,
            expiresAt: { $gt: new Date() },
        });
    }
    async findByUser(userId, userType) {
        return this.findMany({ userId, userType });
    }
    async markAsUsed(token) {
        return this.updateOne({ token }, { isUsed: true });
    }
    async invalidateUserTokens(userId, userType) {
        const result = await this.updateMany({ userId, userType, isUsed: false }, { isUsed: true });
        return result.modifiedCount;
    }
}
exports.PasswordResetRepository = PasswordResetRepository;
exports.passwordResetRepository = new PasswordResetRepository();
