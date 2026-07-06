"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepository = exports.AdminRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const admin_model_1 = require("../model/admin.model");
class AdminRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(admin_model_1.Admin);
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
    async findByEmailWithPassword(email) {
        return this.findOne({ email }, "+password");
    }
    async updateLastLogin(id, lastLogin) {
        return this.updateById(id, { lastLogin });
    }
    async setActiveStatus(id, isActive) {
        return this.updateById(id, { isActive });
    }
}
exports.AdminRepository = AdminRepository;
exports.adminRepository = new AdminRepository();
