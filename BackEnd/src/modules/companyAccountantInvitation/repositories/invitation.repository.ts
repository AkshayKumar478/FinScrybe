import { QueryOptions, Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { InvitationStatus } from "../../../common/types";

import { Invitation } from "../model/invitationModel";
import type { IInvitation } from "../model/invitation.model.interface";
import type { IInvitationRepository } from "./invitation.repository.interface";
import type { InvitationCreateInput } from "./invitationCreateInput.repository";

export class InvitationRepository
  extends BaseRepository<IInvitation, InvitationCreateInput>
  implements IInvitationRepository {

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
    return this.updateById(
      id,
      {
        status,
        ...(acceptedAt && { acceptedAt }),
      },
      options
    );
  }
}

export const invitationRepository = new InvitationRepository();