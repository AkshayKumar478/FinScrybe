"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../common/middlewares/auth.middleware");
const role_middleware_1 = require("../../../common/middlewares/role.middleware");
const validate_middleware_1 = require("../../../common/middlewares/validate.middleware");
const types_1 = require("../../../common/types");
const accountant_controller_1 = require("../controllers/accountant.controller");
const accountant_validation_1 = require("../validators/accountant.validation");
const accountantRouter = (0, express_1.Router)();
accountantRouter.get("/me", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ACCOUNTANT), accountant_controller_1.accountantController.getProfile.bind(accountant_controller_1.accountantController));
accountantRouter.get("/my-company", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.COMPANY_ADMIN), accountant_controller_1.accountantController.listMyCompany.bind(accountant_controller_1.accountantController));
accountantRouter.get("/company/:companyId", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN, types_1.ActorType.COMPANY_ADMIN), (0, validate_middleware_1.validateMiddleware)({ params: accountant_validation_1.companyIdParamsSchema }), accountant_controller_1.accountantController.listByCompany.bind(accountant_controller_1.accountantController));
accountantRouter.patch("/:accountantId/status", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(types_1.ActorType.ADMIN, types_1.ActorType.COMPANY_ADMIN), (0, validate_middleware_1.validateMiddleware)({
    params: accountant_validation_1.accountantIdParamsSchema,
    body: accountant_validation_1.updateAccountantStatusSchema,
}), accountant_controller_1.accountantController.updateStatus.bind(accountant_controller_1.accountantController));
exports.default = accountantRouter;
