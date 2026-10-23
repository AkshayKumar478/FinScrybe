import { QueryOptions, SaveOptions, Types } from "mongoose";

import { InvitationStatus } from "../../../common/types";
import {
  IInvitation,
} from "../model/invitation.model.interface";

export interface IInvitationRepository {
  create(
    payload: Partial<IInvitation>,
    options?: SaveOptions
  ): Promise<IInvitation>;
  findById(id: string): Promise<IInvitation | null>;
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
  deleteExpiredInvitations(date: Date, options?: QueryOptions<IInvitation>): Promise<number>;
}
