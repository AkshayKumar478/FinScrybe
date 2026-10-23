import { QueryOptions ,Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { InvitationStatus } from "../../../common/types";
import {
  Invitation,
} from "../model/invitationModel";
import {IInvitation} from '../model/invitation.model.interface'
import { IInvitationRepository}from './invitation.repository.interface'


export class InvitationRepository
  extends BaseRepository<IInvitation>
  implements IInvitationRepository
{
  constructor() {
    super(Invitation);
  }

  async findByEmail(email: string): Promise<IInvitation | null> {
    return this.findOne({ email });
  }

  async findByToken(token: string): Promise<IInvitation | null> {
    return this.findOne({ token });
  }

  async findByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<IInvitation[]> {
    return this.findMany({ companyId });
  }

  async findPendingByEmailAndCompany(
    companyId: string | Types.ObjectId,
    email: string
  ): Promise<IInvitation | null> {
    return this.findOne({
      companyId,
      email,
      status: InvitationStatus.PENDING,
    });
  }

  async refreshInvitation(
    id: string,
    token: string,
    expiresAt: Date,
    options: QueryOptions<IInvitation> = { new: true }
  ): Promise<IInvitation | null> {
    return this.updateById(
      id,
      {
        token,
        expiresAt,
        status: InvitationStatus.PENDING,
        acceptedAt: undefined,
      },
      options
    );
  }

  async updateStatus(
    id: string,
    status: InvitationStatus,
    acceptedAt?: Date,
    options: QueryOptions<IInvitation> = { new: true }
  ): Promise<IInvitation | null> {
    return this.updateById(id, { status, acceptedAt }, options);
  }

  async deleteExpiredInvitations(
    date: Date,
    options?: QueryOptions<IInvitation>
  ): Promise<number> {
    const result = await this.deleteMany({
      expiresAt: { $lte: date },
    }, options);

    return result.deletedCount ?? 0;
  }
}

export const invitationRepository = new InvitationRepository();
