"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRepository = exports.CompanyRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const model_1 = require("../model/model");
class CompanyRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(model_1.Company);
    }
    async findCompanyByEmail(companyEmail) {
        return this.findOne({ companyEmail });
    }
    async findByCompanyAdminId(companyAdminId) {
        return this.findOne({ companyAdminId });
    }
    async findByStatus(status) {
        return this.findMany({ status });
    }
    async assignCompanyAdmin(companyId, companyAdminId, options) {
        return this.updateById(companyId, { companyAdminId }, options);
    }
    async updateStatus(companyId, status, approvedBy, approvedAt) {
        return this.updateById(companyId, {
            status,
            approvedBy,
            approvedAt,
        });
    }
}
exports.CompanyRepository = CompanyRepository;
exports.companyRepository = new CompanyRepository();
