"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const jwt_1 = require("../utils/jwt");
const authenticatedActor_service_1 = require("../services/authenticatedActor.service");
const authMiddleware = async (req, _res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw new UnauthorizedError_1.UnauthorizedError("Access token is required");
        }
        const payload = (0, jwt_1.verifyAccessToken)(token);
        const actor = await authenticatedActor_service_1.authenticatedActorService.findActorById(payload.actorType, payload.id);
        if (!actor) {
            throw new UnauthorizedError_1.UnauthorizedError("Authenticated user no longer exists");
        }
        req.user = {
            id: actor._id.toString(),
            actorType: payload.actorType,
            email: actor.email,
            fullName: actor.fullName,
            companyAdminRole: payload.actorType === "COMPANY_ADMIN"
                ? actor.role
                : undefined,
        };
        next();
    }
    catch (error) {
        if (error instanceof UnauthorizedError_1.UnauthorizedError) {
            return next(error);
        }
        next(new UnauthorizedError_1.UnauthorizedError("Invalid or expired access token"));
    }
};
exports.authMiddleware = authMiddleware;
