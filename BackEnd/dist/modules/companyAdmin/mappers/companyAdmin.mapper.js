"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCompanyAdminAccount = mapCompanyAdminAccount;
function mapCompanyAdminAccount(account) {
    return {
        id: account._id.toString(),
        email: account.email,
        fullName: account.fullName,
        role: account.role,
    };
}
