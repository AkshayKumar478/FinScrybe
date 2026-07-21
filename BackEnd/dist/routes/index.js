"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = __importDefault(require("../modules/admin/routes/admin.routes"));
const company_routes_1 = __importDefault(require("../modules/company/routes/company.routes"));
const router = (0, express_1.Router)();
router.use("/admin", admin_routes_1.default);
router.use("/companies", company_routes_1.default);
exports.default = router;
