"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAdminAuthUser = mapAdminAuthUser;
exports.mapAdminLoginResponse = mapAdminLoginResponse;
function mapAdminAuthUser(admin) {
    return {
        id: admin._id.toString(),
        fullName: admin.fullName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        profilePhoto: admin.profilePhoto,
    };
}
function mapAdminLoginResponse(params) {
    return {
        message: params.message,
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
        user: mapAdminAuthUser(params.user),
    };
}
