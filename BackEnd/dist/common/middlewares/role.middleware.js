"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const ForbiddenError_1 = require("../errors/ForbiddenError");
const types_1 = require("../types");
const roleMiddleware = (...roles) => {
    const options = normalizeAuthorizationOptions(roles);
    return (req, _res, next) => {
        if (!req.user) {
            return next(new ForbiddenError_1.ForbiddenError("Authentication is required"));
        }
        if (!options.actorTypes.includes(req.user.actorType)) {
            return next(new ForbiddenError_1.ForbiddenError("You do not have access to this resource"));
        }
        if (req.user.actorType === types_1.ActorType.COMPANY_ADMIN &&
            options.companyAdminRoles?.length &&
            (!req.user.companyAdminRole ||
                !options.companyAdminRoles.includes(req.user.companyAdminRole))) {
            return next(new ForbiddenError_1.ForbiddenError("You do not have permission for this action"));
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
const normalizeAuthorizationOptions = (roles) => {
    const actorTypes = roles.filter((role) => Object.values(types_1.ActorType).includes(role));
    const companyAdminRoles = roles.filter((role) => Object.values(types_1.CompanyAdminRole).includes(role));
    if (companyAdminRoles.length > 0 && actorTypes.length === 0) {
        actorTypes.push(types_1.ActorType.COMPANY_ADMIN);
    }
    return {
        actorTypes,
        companyAdminRoles,
    };
};
