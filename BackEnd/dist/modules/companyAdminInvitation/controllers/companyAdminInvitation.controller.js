"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminInvitationController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const companyAdminInvitation_service_1 = require("../services/companyAdminInvitation.service");
class CompanyAdminInvitationController {
    async createInvitation(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await companyAdminInvitation_service_1.companyAdminInvitationService.createInvitation(req.user.id, req.body);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async validateInvitation(req, res, next) {
        try {
            const response = await companyAdminInvitation_service_1.companyAdminInvitationService.validateInvitation(req.query.token);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async resendInvitation(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await companyAdminInvitation_service_1.companyAdminInvitationService.resendInvitation(req.user.id, req.params.invitationId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async acceptInvitation(req, res, next) {
        try {
            const response = await companyAdminInvitation_service_1.companyAdminInvitationService.acceptInvitation(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.companyAdminInvitationController = new CompanyAdminInvitationController();
