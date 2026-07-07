"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapForgotPasswordResponse = mapForgotPasswordResponse;
exports.mapResetPasswordResponse = mapResetPasswordResponse;
function mapForgotPasswordResponse() {
    return {
        message: "Password reset email sent successfully",
    };
}
function mapResetPasswordResponse(actorType) {
    return {
        message: "Password reset successful",
        actorType,
    };
}
