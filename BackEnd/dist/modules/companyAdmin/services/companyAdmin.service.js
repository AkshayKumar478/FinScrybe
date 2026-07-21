"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminService = void 0;
const companyAdmin_repository_1 = require("../repositories/companyAdmin.repository");
class CompanyAdminService {
    constructor(repository) {
        this.repository = repository;
    }
}
exports.companyAdminService = new CompanyAdminService(companyAdmin_repository_1.companyAdminRepository);
