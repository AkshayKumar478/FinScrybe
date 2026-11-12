import { InvitationStatus } from "../../../common/types";
export interface InvitationResponse {
  id:string,
  email:string,
  department:string,
  status:InvitationStatus
  expiresAt:Date,
  createdAt:Date

}

export interface InvitationListResponse {
  invitations: InvitationResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface CreateInvitationInput {
  email: string;
  department: string;
}

export interface InvitationValidationResponse {
  invitationId: string;
  email: string;
  department: string;
  expiresAt: Date;
}

export interface InvitationValidationResponse {
  invitationId: string;
  email: string;
  department: string;
  expiresAt: Date;
}