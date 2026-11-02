import { InvitationStatus } from "../../../common/types";
export interface InvitationCreateInput {
  companyId: string;
  invitedBy: string;
  email: string;
  department: string;
  token: string;
  status: InvitationStatus;
  expiresAt: Date;
}