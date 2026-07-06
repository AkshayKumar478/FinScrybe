"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const invitation_service_1 = require("../services/invitation.service");
class InvitationController {
    async createInvitation(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await invitation_service_1.invitationService.createInvitation(req.user.id, req.body);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async validateInvitation(req, res, next) {
        try {
            const response = await invitation_service_1.invitationService.validateInvitation(req.query.token);
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
            const response = await invitation_service_1.invitationService.resendInvitation(req.user.id, req.params.invitationId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async acceptInvitation(req, res, next) {
        try {
            const response = await invitation_service_1.invitationService.acceptInvitation(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.invitationController = new InvitationController();
