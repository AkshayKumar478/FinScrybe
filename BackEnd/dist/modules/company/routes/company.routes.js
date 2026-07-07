"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../common/middlewares/auth.middleware");
const role_middleware_1 = require("../../../common/middlewares/role.middleware");
const validate_middleware_1 = require("../../../common/middlewares/validate.middleware");
const types_1 = require("../../../common/types");
const company_controller_1 = require("../controllers/company.controller");
const company_validation_1 = require("../validators/company.validation");
const companyRouter = (0, express_1.Router)();
companyRouter.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN), company_controller_1.companyController.listAll.bind(company_controller_1.companyController));
companyRouter.get("/pending", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN), company_controller_1.companyController.listPending.bind(company_controller_1.companyController));
companyRouter.get("/me", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.COMPANY_ADMIN, types_1.ActorType.ACCOUNTANT), company_controller_1.companyController.getCurrentCompany.bind(company_controller_1.companyController));
companyRouter.get("/:companyId", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN), (0, validate_middleware_1.validateMiddleware)({ params: company_validation_1.companyIdParamsSchema }), company_controller_1.companyController.getById.bind(company_controller_1.companyController));
companyRouter.patch("/:companyId/status", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN), (0, validate_middleware_1.validateMiddleware)({
    params: company_validation_1.companyIdParamsSchema,
    body: company_validation_1.updateCompanyStatusSchema,
}), company_controller_1.companyController.updateStatus.bind(company_controller_1.companyController));
exports.default = companyRouter;
