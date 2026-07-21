"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
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
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.Admin = mongoose_1.models.Admin || (0, mongoose_1.model)("Admin", adminSchema);
