"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async loginSuperAdmin(req, res, next) {
        try {
            const response = await auth_service_1.authService.loginSuperAdmin(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async registerCompany(req, res, next) {
        try {
            const response = await auth_service_1.authService.registerCompany(req.body);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async loginCompanyAdmin(req, res, next) {
        try {
            const response = await auth_service_1.authService.loginCompanyAdmin(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async loginAccountant(req, res, next) {
        try {
            const response = await auth_service_1.authService.loginAccountant(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
