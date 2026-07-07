"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const NotFoundError_1 = require("../../../common/errors/NotFoundError");
const admin_repository_1 = require("../repositories/admin.repository");
const admin_mapper_1 = require("../mappers/admin.mapper");
class AdminService {
    constructor(repository) {
        this.repository = repository;
    }
    async getProfile(adminId) {
        const admin = await this.repository.findById(adminId);
        if (!admin) {
            throw new NotFoundError_1.NotFoundError("Admin not found");
        }
        return (0, admin_mapper_1.mapAdminProfile)(admin);
    }
}
exports.adminService = new AdminService(admin_repository_1.adminRepository);
