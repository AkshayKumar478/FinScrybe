"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapInvitation = mapInvitation;
exports.mapInvitationMessageResponse = mapInvitationMessageResponse;
exports.mapInvitationValidationResponse = mapInvitationValidationResponse;
exports.mapInvitationAcceptanceResponse = mapInvitationAcceptanceResponse;
function mapInvitation(invitation) {
    return {
        id: invitation._id.toString(),
        email: invitation.email,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
    };
}
function mapInvitationMessageResponse(message, invitation) {
    return {
        message,
        invitation: mapInvitation(invitation),
    };
}
function mapInvitationValidationResponse(message, invitation, details) {
    return {
        message,
        invitation: mapInvitation(invitation),
        details,
    };
}
function mapInvitationAcceptanceResponse(message, account) {
    return {
        message,
        account,
    };
}
