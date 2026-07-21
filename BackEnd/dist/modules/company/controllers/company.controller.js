"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const company_service_1 = require("../services/company.service");
class CompanyController {
    async registerCompany(req, res, next) {
        try {
            const response = await company_service_1.companyService.registerCompany(req.body);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async listAll(req, res, next) {
        try {
            const response = await company_service_1.companyService.listAll();
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async listPending(_req, res, next) {
        try {
            const response = await company_service_1.companyService.listPending();
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getCurrentCompany(req, res, next) {
        try {
            if (!req.user?.id || !req.user.actorType) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await company_service_1.companyService.getCurrentUsersCompany(req.user.actorType, req.user.id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const response = await company_service_1.companyService.getById(req.params.companyId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await company_service_1.companyService.updateStatus(req.params.companyId, req.body.status, req.user.id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.companyController = new CompanyController();
