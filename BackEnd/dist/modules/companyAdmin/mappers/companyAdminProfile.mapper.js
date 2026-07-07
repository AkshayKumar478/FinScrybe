"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCompanyAdminProfile = mapCompanyAdminProfile;
exports.mapCompanyAdminProfiles = mapCompanyAdminProfiles;
function mapCompanyAdminProfile(companyAdmin) {
    return {
        id: companyAdmin._id.toString(),
        companyId: companyAdmin.companyId.toString(),
        fullName: companyAdmin.fullName,
        email: companyAdmin.email,
        phoneNumber: companyAdmin.phoneNumber,
        profilePhoto: companyAdmin.profilePhoto,
        role: companyAdmin.role,
        invitedBy: companyAdmin.invitedBy?.toString(),
        isPrimaryAdmin: companyAdmin.isPrimaryAdmin,
        isActive: companyAdmin.isActive,
        lastLogin: companyAdmin.lastLogin,
        createdAt: companyAdmin.createdAt,
        updatedAt: companyAdmin.updatedAt,
    };
}
function mapCompanyAdminProfiles(companyAdmins) {
    return companyAdmins.map(mapCompanyAdminProfile);
}
