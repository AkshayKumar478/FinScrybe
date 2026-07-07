"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const companyAdmin_service_1 = require("../services/companyAdmin.service");
class CompanyAdminController {
    async getProfile(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await companyAdmin_service_1.companyAdminService.getProfile(req.user.id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async listMyCompany(req, res, next) {
        try {
            if (!req.user?.id || !req.user.actorType) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await companyAdmin_service_1.companyAdminService.listForCurrentCompany(req.user.actorType, req.user.id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async listByCompany(req, res, next) {
        try {
            const response = await companyAdmin_service_1.companyAdminService.listByCompany(req.params.companyId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            if (!req.user?.id || !req.user.actorType) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await companyAdmin_service_1.companyAdminService.updateStatus(req.user.actorType, req.user.id, req.params.companyAdminId, req.body.isActive);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.companyAdminController = new CompanyAdminController();
