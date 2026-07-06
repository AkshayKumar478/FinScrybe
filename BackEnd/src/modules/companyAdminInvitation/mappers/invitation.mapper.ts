import { InvitationStatus } from "../../../common/types";

export interface InvitationResponse {
  id: string;
  email: string;
  status: InvitationStatus;
  expiresAt: Date;
}

export interface InvitationMessageResponse {
  message: string;
  invitation: InvitationResponse;
}

export interface InvitationValidationResponse<TDetails> {
  message: string;
  invitation: InvitationResponse;
  details: TDetails;
}

export interface InvitationAcceptanceResponse<TAccount> {
  message: string;
  account: TAccount | null;
}

export function mapInvitation(invitation: {
  _id: { toString(): string };
  email: string;
  status: InvitationStatus;
  expiresAt: Date;
}): InvitationResponse {
  return {
    id: invitation._id.toString(),
    email: invitation.email,
    status: invitation.status,
    expiresAt: invitation.expiresAt,
  };
}

export function mapInvitationMessageResponse(
  message: string,
  invitation: {
    _id: { toString(): string };
    email: string;
    status: InvitationStatus;
    expiresAt: Date;
  }
): InvitationMessageResponse {
  return {
    message,
    invitation: mapInvitation(invitation),
  };
}

export function mapInvitationValidationResponse<TDetails>(
  message: string,
  invitation: {
    _id: { toString(): string };
    email: string;
    status: InvitationStatus;
    expiresAt: Date;
  },
  details: TDetails
): InvitationValidationResponse<TDetails> {
  return {
    message,
    invitation: mapInvitation(invitation),
    details,
  };
}

export function mapInvitationAcceptanceResponse<TAccount>(
  message: string,
  account: TAccount | null
): InvitationAcceptanceResponse<TAccount> {
  return {
    message,
    account,
  };
}
