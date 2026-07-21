"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepository = exports.AdminRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const admin_model_1 = require("../model/admin.model");
class AdminRepository extends base_repository_1.BaseRepository {
    constructor(adminModel) {
        super(adminModel);
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
    async findAll() {
        return this.findMany();
    }
    async findByEmailWithPassword(email) {
        return this.findOne({ email }, "+password");
    }
    async updateLastLogin(id, lastLogin) {
        return this.updateById(id, { lastLogin });
    }
    async updatePassword(id, password) {
        return this.updateById(id, { password });
    }
}
exports.AdminRepository = AdminRepository;
exports.adminRepository = new AdminRepository(admin_model_1.Admin);
