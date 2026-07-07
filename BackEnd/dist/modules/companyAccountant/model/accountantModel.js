"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accountant = void 0;
const mongoose_1 = require("mongoose");
const accountantSchema = new mongoose_1.Schema({
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
    department: {
        type: String,
        required: true,
        trim: true,
    },
    profilePhoto: {
        type: String,
        default: "",
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
exports.Accountant = mongoose_1.models.Accountant ||
    (0, mongoose_1.model)("Accountant", accountantSchema);
