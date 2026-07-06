"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationRepository = exports.InvitationRepository = void 0;
const base_repository_1 = require("../../../common/base/base.repository");
const types_1 = require("../../../common/types");
const invitationModel_1 = require("../model/invitationModel");
class InvitationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(invitationModel_1.Invitation);
    }
    async findByEmail(email) {
        return this.findOne({ email });
    }
    async findByToken(token) {
        return this.findOne({ token });
    }
    async findByCompanyId(companyId) {
        return this.findMany({ companyId });
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
    async deleteExpiredInvitations(date, options) {
        const result = await this.deleteMany({
            expiresAt: { $lte: date },
        }, options);
        return result.deletedCount ?? 0;
    }
}
exports.InvitationRepository = InvitationRepository;
exports.invitationRepository = new InvitationRepository();
