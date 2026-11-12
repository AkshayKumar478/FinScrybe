
import type {
  InvitationResponse,
  InvitationListResponse,
} from "./invitation.mapper.interface";

import type { IInvitation } from "../model/invitation.model.interface";
import { InvitationValidationResponse } from "./invitation.mapper.interface";

export const mapInvitation = (
  invitation: IInvitation
): InvitationResponse => ({
  id: invitation._id.toString(),
  email: invitation.email,
  department: invitation.department,
  status: invitation.status,
  expiresAt: invitation.expiresAt,
  ...(invitation.acceptedAt && {
    acceptedAt: invitation.acceptedAt,
  }),
  ...(invitation.cancelledAt && {
    cancelledAt: invitation.cancelledAt,
  }),
  createdAt: invitation.createdAt,
});

export const mapInvitations = (
  invitations: IInvitation[]
): InvitationResponse[] =>
  invitations.map(mapInvitation);

export const mapInvitationList = (
  invitations: IInvitation[],
  total: number,
  page: number,
  limit: number
): InvitationListResponse => ({
  invitations: mapInvitations(invitations),
  total,
  page,
  limit,
  totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
});
export const mapInvitationValidation = (
  invitation: IInvitation
): InvitationValidationResponse => ({
  invitationId: invitation._id.toString(),
  email: invitation.email,
  department: invitation.department,
  expiresAt: invitation.expiresAt,
});