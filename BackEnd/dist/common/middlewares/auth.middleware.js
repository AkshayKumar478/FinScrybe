"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const auth_repository_1 = require("../../modules/auth/repositories/auth.repository");
const jwt_1 = require("../utils/jwt");
const authenticatedActorRepository = auth_repository_1.authRepository;
const authMiddleware = async (req, _res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization?.startsWith("Bearer ")) {
            throw new UnauthorizedError_1.UnauthorizedError("Access token is required");
        }
        const token = authorization.split(" ")[1];
        const payload = (0, jwt_1.verifyAccessToken)(token);
        const actor = await authenticatedActorRepository.findActorById(payload.actorType, payload.id);
        if (!actor) {
            throw new UnauthorizedError_1.UnauthorizedError("Authenticated user no longer exists");
        }
        if (!actor.isActive) {
            throw new UnauthorizedError_1.UnauthorizedError("Authenticated user is inactive");
        }
        req.user = {
            id: actor._id.toString(),
            actorType: payload.actorType,
            email: actor.email,
            fullName: actor.fullName,
            isActive: actor.isActive,
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
