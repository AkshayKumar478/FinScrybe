"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const admin_service_1 = require("../services/admin.service");
class AdminController {
    async getProfile(req, res, next) {
        try {
            if (!req.user?.id) {
                throw new UnauthorizedError_1.UnauthorizedError("Authentication is required");
            }
            const response = await admin_service_1.adminService.getProfile(req.user.id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.adminController = new AdminController();
