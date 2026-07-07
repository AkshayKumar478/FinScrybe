"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAdminProfile = mapAdminProfile;
function mapAdminProfile(admin) {
    return {
        id: admin._id.toString(),
        fullName: admin.fullName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        profilePhoto: admin.profilePhoto,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
    };
}
