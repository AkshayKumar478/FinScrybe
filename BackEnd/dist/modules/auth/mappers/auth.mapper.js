"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapActorToAuthUser = mapActorToAuthUser;
exports.mapCompanySummary = mapCompanySummary;
exports.mapCompanyRegistrationResponse = mapCompanyRegistrationResponse;
exports.mapAuthResponse = mapAuthResponse;
function mapActorToAuthUser(actor, actorType) {
    return {
        id: actor._id.toString(),
        fullName: actor.fullName,
        email: actor.email,
        phoneNumber: actor.phoneNumber,
        profilePhoto: actor.profilePhoto,
        actorType,
    };
}
function mapCompanySummary(company) {
    return {
        id: company._id.toString(),
        companyName: company.companyName,
        companyEmail: company.companyEmail,
        status: company.status,
    };
}
function mapCompanyRegistrationResponse(company, companyAdmin) {
    return {
        message: "Company registration submitted successfully",
        company: mapCompanySummary(company),
        companyAdmin: {
            id: companyAdmin._id.toString(),
            fullName: companyAdmin.fullName,
            email: companyAdmin.email,
            phoneNumber: companyAdmin.phoneNumber,
        },
    };
}
function mapAuthResponse(params) {
    return {
        message: params.message,
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
        user: mapActorToAuthUser(params.user, params.actorType),
        company: params.company
            ? mapCompanySummary(params.company)
            : undefined,
    };
}
