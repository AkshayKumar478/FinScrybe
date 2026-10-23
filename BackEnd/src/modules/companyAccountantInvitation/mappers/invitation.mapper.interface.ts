import { InvitationStatus } from "../../../common/types";
export interface InvitationResponse {
  id: string;
  email: string;
  department: string;
  status: InvitationStatus;
  expiresAt: Date;
  acceptedAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
}

export interface InvitationListResponse {
  invitations: InvitationResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}