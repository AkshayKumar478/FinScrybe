"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitation = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../../../common/types/index");
const invitationSchema = new mongoose_1.Schema({
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
        enum: Object.values(index_1.ActorType),
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: Object.values(index_1.InvitationStatus),
        default: index_1.InvitationStatus.PENDING,
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
invitationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.Invitation = mongoose_1.models.Invitation ||
    (0, mongoose_1.model)("Invitation", invitationSchema);
