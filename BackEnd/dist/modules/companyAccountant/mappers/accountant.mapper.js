"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAccountantAccount = mapAccountantAccount;
function mapAccountantAccount(account) {
    return {
        id: account._id.toString(),
        email: account.email,
        fullName: account.fullName,
        department: account.department,
    };
}
