"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAdminInvitation = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../../../common/types");
const companyAdminInvitationSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
        index: true,
    },
    invitedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    invitedByType: {
        type: String,
        enum: Object.values(types_1.ActorType),
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        enum: Object.values(types_1.CompanyAdminRole),
        default: types_1.CompanyAdminRole.EXECUTIVE,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values(types_1.InvitationStatus),
        default: types_1.InvitationStatus.PENDING,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    acceptedAt: {
        type: Date,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    },
    versionKey: false,
});
companyAdminInvitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.CompanyAdminInvitation = mongoose_1.models.CompanyAdminInvitation ||
    (0, mongoose_1.model)("CompanyAdminInvitation", companyAdminInvitationSchema);
