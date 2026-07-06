"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyAdminInvitationRepository = exports.CompanyAdminInvitationRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const types_1 = require("../../../common/types");
const companyAdminInvitationModel_1 = require("../model/companyAdminInvitationModel");
class CompanyAdminInvitationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(companyAdminInvitationModel_1.CompanyAdminInvitation);
    }
    async findByToken(token) {
        return this.findOne({ token });
    }
    async findPendingByEmailAndCompany(companyId, email) {
        return this.findOne({
            companyId,
            email,
            status: types_1.InvitationStatus.PENDING,
        });
    }
    async refreshInvitation(id, token, expiresAt, options = { new: true }) {
        return this.updateById(id, {
            token,
            expiresAt,
            status: types_1.InvitationStatus.PENDING,
            acceptedAt: undefined,
        }, options);
    }
    async updateStatus(id, status, acceptedAt, options = { new: true }) {
        return this.updateById(id, { status, acceptedAt }, options);
    }
}
exports.CompanyAdminInvitationRepository = CompanyAdminInvitationRepository;
exports.companyAdminInvitationRepository = new CompanyAdminInvitationRepository();
