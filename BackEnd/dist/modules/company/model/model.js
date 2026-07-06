"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../../../common/types/index");
const companySchema = new mongoose_1.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    industry: {
        type: String,
        required: true,
        trim: true,
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    companyPhone: {
        type: String,
        required: true,
        trim: true,
    },
    companyAdminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CompanyAdmin",
    },
    status: {
        type: String,
        enum: Object.values(index_1.CompanyStatus),
        default: index_1.CompanyStatus.PENDING,
        index: true,
    },
    approvedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admin",
    },
    approvedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.Company = mongoose_1.models.Company || (0, mongoose_1.model)("Company", companySchema);
