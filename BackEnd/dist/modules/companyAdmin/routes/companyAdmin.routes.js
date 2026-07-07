"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../common/middlewares/auth.middleware");
const role_middleware_1 = require("../../../common/middlewares/role.middleware");
const validate_middleware_1 = require("../../../common/middlewares/validate.middleware");
const types_1 = require("../../../common/types");
const companyAdmin_controller_1 = require("../controllers/companyAdmin.controller");
const companyAdmin_validation_1 = require("../validators/companyAdmin.validation");
const companyAdminRouter = (0, express_1.Router)();
companyAdminRouter.get("/me", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.COMPANY_ADMIN), companyAdmin_controller_1.companyAdminController.getProfile.bind(companyAdmin_controller_1.companyAdminController));
companyAdminRouter.get("/my-company", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.COMPANY_ADMIN), companyAdmin_controller_1.companyAdminController.listMyCompany.bind(companyAdmin_controller_1.companyAdminController));
companyAdminRouter.get("/company/:companyId", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN), (0, validate_middleware_1.validateMiddleware)({ params: companyAdmin_validation_1.companyIdParamsSchema }), companyAdmin_controller_1.companyAdminController.listByCompany.bind(companyAdmin_controller_1.companyAdminController));
companyAdminRouter.patch("/:companyAdminId/status", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN, types_1.ActorType.COMPANY_ADMIN), (0, validate_middleware_1.validateMiddleware)({
    params: companyAdmin_validation_1.companyAdminIdParamsSchema,
    body: companyAdmin_validation_1.updateCompanyAdminStatusSchema,
}), companyAdmin_controller_1.companyAdminController.updateStatus.bind(companyAdmin_controller_1.companyAdminController));
exports.default = companyAdminRouter;
