"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetController = void 0;
const passwordReset_service_1 = require("../services/passwordReset.service");
class PasswordResetController {
    async forgotPassword(req, res, next) {
        try {
            const response = await passwordReset_service_1.passwordResetService.forgotPassword(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const response = await passwordReset_service_1.passwordResetService.resetPassword(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.passwordResetController = new PasswordResetController();
