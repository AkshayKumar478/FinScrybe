import { ActorType } from "../../../common/types";

export interface PasswordResetEmailResponse {
  message: string;
}

export interface PasswordResetSuccessResponse {
  message: string;
  actorType: ActorType;
}

export function mapForgotPasswordResponse(): PasswordResetEmailResponse {
  return {
    message: "Password reset email sent successfully",
  };
}

export function mapResetPasswordResponse(
  actorType: ActorType
): PasswordResetSuccessResponse {
  return {
    message: "Password reset successful",
    actorType,
  };
}
