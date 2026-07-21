"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const UnauthorizedError_1 = require("../../../common/errors/UnauthorizedError");
const admin_service_1 = require("../services/admin.service");
const cookies_1 = require("../../../common/utils/cookies");
class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async login(req, res, next) {
        try {
            const response = await this.adminService.login(req.body);
            res.cookie("accessToken", response.accessToken, cookies_1.accessTokenCookieOptions)
                .cookie("refreshToken", response.refreshToken, cookies_1.refreshTokenCookieOptions)
                .status(200)
                .json({
                message: response.message,
                user: response.user,
                accessToken: response.accessToken,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw new UnauthorizedError_1.UnauthorizedError("Refresh token is required");
            }
            const tokens = await this.adminService.refreshToken(refreshToken);
            res
                .cookie("accessToken", tokens.accessToken, cookies_1.accessTokenCookieOptions)
                .cookie("refreshToken", tokens.refreshToken, cookies_1.refreshTokenCookieOptions)
                .status(200)
                .json({
                message: "Token refreshed",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(_req, res, next) {
        try {
            res
                .clearCookie("accessToken")
                .clearCookie("refreshToken")
                .status(200)
                .json({
                message: "Logout successful",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.adminController = new AdminController(admin_service_1.adminService);
