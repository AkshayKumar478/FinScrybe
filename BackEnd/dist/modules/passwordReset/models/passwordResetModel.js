"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../../../common/types/index");
const passwordResetSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    userType: {
        type: String,
        enum: Object.values(index_1.ActorType),
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false,
    },
    versionKey: false,
});
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.PasswordReset = mongoose_1.models.PasswordReset ||
    (0, mongoose_1.model)("PasswordReset", passwordResetSchema);
