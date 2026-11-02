import { QueryOptions, Types } from "mongoose";

import { InvitationStatus } from "../../../common/types";
import type { IBaseRepository } from "../../../common/base/base.repository.interface";
import type { IInvitation } from "../model/invitation.model.interface";
import type { InvitationCreateInput } from "./invitationCreateInput.repository";

export interface IInvitationRepository
  extends IBaseRepository<IInvitation, InvitationCreateInput> {

  findByEmail(email: string): Promise<IInvitation | null>;

  findByToken(token: string): Promise<IInvitation | null>;

  findByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<IInvitation[]>;

  findPendingByEmailAndCompany(
    companyId: string | Types.ObjectId,
    email: string
  ): Promise<IInvitation | null>;

  refreshInvitation(
    id: string,
    token: string,
    expiresAt: Date,
    options?: QueryOptions<IInvitation>
  ): Promise<IInvitation | null>;

  updateStatus(
    id: string,
    status: InvitationStatus,
    acceptedAt?: Date,
    options?: QueryOptions<IInvitation>
  ): Promise<IInvitation | null>;
}