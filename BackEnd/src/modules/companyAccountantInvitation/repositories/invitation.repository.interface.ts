
import { Types } from "mongoose";
import { ClientSession } from "mongoose";

import { InvitationStatus } from "../../../common/types";
import type { IBaseRepository } from "../../../common/base/base.repository.interface";
import type { IInvitation } from "../model/invitation.model.interface";
import type { InvitationCreateInput } from "./invitationCreateInput.repository";

export interface IInvitationRepository
  extends IBaseRepository<IInvitation, InvitationCreateInput> {
findByEmail(email: string): Promise<IInvitation | null>;
findByCompanyId(companyId: string | Types.ObjectId): Promise<IInvitation[]>;
findPendingByEmailAndCompany(companyId: string | Types.ObjectId, email: string): Promise<IInvitation | null>;
refreshInvitation(id: string, companyId: string | Types.ObjectId, token: string, expiresAt: Date): Promise<IInvitation | null>;
cancelInvitation(id: string, companyId: string | Types.ObjectId, cancelledAt: Date): Promise<IInvitation | null>;
updateStatus(id: string, status: InvitationStatus, acceptedAt?: Date): Promise<IInvitation | null>;
acceptInvitation(invitationId: string, tokenHash: string, acceptedAt: Date, session: ClientSession): Promise<IInvitation | null>;
}
