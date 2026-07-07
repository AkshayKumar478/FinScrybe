"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountantController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const accountant_service_1 = require("../services/accountant.service");
class AccountantController {
    async getProfile(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await accountant_service_1.accountantService.getProfile(req.user.id);
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
            const response = await accountant_service_1.accountantService.listForCurrentCompany(req.user.actorType, req.user.id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async listByCompany(req, res, next) {
        try {
            if (!req.user?.id || !req.user.actorType) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await accountant_service_1.accountantService.listByCompanyForActor(req.user.actorType, req.user.id, req.params.companyId);
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
            const response = await accountant_service_1.accountantService.updateStatus(req.user.actorType, req.user.id, req.params.accountantId, req.body.isActive);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.accountantController = new AccountantController();
