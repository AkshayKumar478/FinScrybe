"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCompany = mapCompany;
exports.mapCompanySummary = mapCompanySummary;
exports.mapCompanyRegistrationResponse = mapCompanyRegistrationResponse;
exports.mapCompanies = mapCompanies;
function mapCompany(company) {
    return {
        id: company._id.toString(),
        companyName: company.companyName,
        industry: company.industry,
        companyEmail: company.companyEmail,
        companyPhone: company.companyPhone,
        companyAdminId: company.companyAdminId?.toString(),
        status: company.status,
        approvedBy: company.approvedBy?.toString(),
        approvedAt: company.approvedAt,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
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
function mapCompanies(companies) {
    return companies.map(mapCompany);
}
