"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminRepository = exports.CompanyAdminRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const model_1 = require("../model/model");
class CompanyAdminRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(model_1.CompanyAdmin);
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
    async findByEmailWithPassword(email) {
        return this.findOne({ email }, "+password");
    }
    async findByCompanyId(companyId) {
        return this.findMany({ companyId });
    }
    async findPrimaryByCompanyId(companyId) {
        return this.findOne({ companyId, isPrimaryAdmin: true });
    }
    async updateLastLogin(id, lastLogin) {
        return this.updateById(id, { lastLogin });
    }
    async setActiveStatus(id, isActive) {
        return this.updateById(id, { isActive });
    }
}
exports.CompanyAdminRepository = CompanyAdminRepository;
exports.companyAdminRepository = new CompanyAdminRepository();
