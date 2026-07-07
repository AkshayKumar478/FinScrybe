"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountantRepository = exports.AccountantRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const accountantModel_1 = require("../model/accountantModel");
class AccountantRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(accountantModel_1.Accountant);
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
    async findAll() {
        return this.findMany();
    }
    async updateLastLogin(id, lastLogin) {
        return this.updateById(id, { lastLogin });
    }
    async setActiveStatus(id, isActive) {
        return this.updateById(id, { isActive });
    }
}
exports.AccountantRepository = AccountantRepository;
exports.accountantRepository = new AccountantRepository();
