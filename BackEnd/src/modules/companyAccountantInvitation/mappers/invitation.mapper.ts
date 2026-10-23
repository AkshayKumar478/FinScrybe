
import {InvitationResponse,InvitationListResponse} from './invitation.mapper.interface'
import { IInvitation } from '../model/invitation.model.interface';


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
): InvitationResponse[] => {
  return invitations.map(mapInvitation);
};

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
  totalPages: Math.ceil(total / limit),
});
