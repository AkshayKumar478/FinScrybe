"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAccountantProfile = mapAccountantProfile;
exports.mapAccountantProfiles = mapAccountantProfiles;
function mapAccountantProfile(accountant) {
    return {
        id: accountant._id.toString(),
        companyId: accountant.companyId.toString(),
        fullName: accountant.fullName,
        email: accountant.email,
        phoneNumber: accountant.phoneNumber,
        department: accountant.department,
        profilePhoto: accountant.profilePhoto,
        isActive: accountant.isActive,
        lastLogin: accountant.lastLogin,
        createdAt: accountant.createdAt,
        updatedAt: accountant.updatedAt,
    };
}
function mapAccountantProfiles(accountants) {
    return accountants.map(mapAccountantProfile);
}
