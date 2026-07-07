"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyStatusSchema = exports.companyIdParamsSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../common/types");
exports.companyIdParamsSchema = zod_1.z.object({
    companyId: zod_1.z.string().min(1, "Company id is required"),
});
exports.updateCompanyStatusSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(types_1.CompanyStatus),
});
