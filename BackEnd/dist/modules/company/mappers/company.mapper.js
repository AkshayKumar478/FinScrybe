"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCompany = mapCompany;
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
function mapCompanies(companies) {
    return companies.map(mapCompany);
}
