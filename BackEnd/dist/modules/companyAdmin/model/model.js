"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAdmin = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../../../common/types/index");
const companyAdminSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    profilePhoto: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: Object.values(index_1.CompanyAdminRole),
        default: index_1.CompanyAdminRole.EXECUTIVE,
    },
    invitedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CompanyAdmin",
    },
    isPrimaryAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
    versionKey: false,
});
companyAdminSchema.index({ companyId: 1 });
companyAdminSchema.index({ companyId: 1, email: 1 });
exports.CompanyAdmin = mongoose_1.models.CompanyAdmin ||
    (0, mongoose_1.model)("CompanyAdmin", companyAdminSchema);
