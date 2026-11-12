import { Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { InvitationStatus } from "../../../common/types";

import { Invitation } from "../model/invitationModel";
import type { IInvitation } from "../model/invitation.model.interface";
import type { IInvitationRepository } from "./invitation.repository.interface";
import type { InvitationCreateInput } from "./invitationCreateInput.repository";
import { ClientSession } from "mongoose";

export class InvitationRepository
  extends BaseRepository<IInvitation, InvitationCreateInput>
  implements IInvitationRepository {

  constructor() {
    super(Invitation);
  }

  async findByEmail(email: string): Promise<IInvitation | null> {
    return this.findOne({ email });
  }

  async findByCompanyId(companyId: string | Types.ObjectId): Promise<IInvitation[]> {
    return this.findMany({ companyId });
  }

  async findPendingByEmailAndCompany(companyId: string | Types.ObjectId,email: string): Promise<IInvitation | null> {
    return this.findOne({
      companyId,
      email,
      status: InvitationStatus.PENDING,
    });
  }

  async refreshInvitation(id: string,companyId: string | Types.ObjectId,token: string,expiresAt: Date): Promise<IInvitation | null> {
    return this.model.findOneAndUpdate(
      {
        _id: id,
        companyId,
        status: InvitationStatus.PENDING,
      },
      {
        $set: {
          token,
          expiresAt,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async cancelInvitation(id: string,companyId: string | Types.ObjectId,cancelledAt: Date): Promise<IInvitation | null> {
    return this.model.findOneAndUpdate(
      {
        _id: id,
        companyId,
        status: InvitationStatus.PENDING,
      },
      {
        $set: {
          status: InvitationStatus.CANCELLED,
          cancelledAt,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

    async updateStatus(id: string,status: InvitationStatus,acceptedAt?: Date): Promise<IInvitation | null> {
      return this.updateById(id, {
        status,
        ...(acceptedAt && { acceptedAt }),
      });
    }

  async acceptInvitation(invitationId: string,tokenHash: string,acceptedAt: Date,session: ClientSession): Promise<IInvitation | null> {
    return this.model.findOneAndUpdate(
      {
        _id: invitationId,
        token: tokenHash,
        status: InvitationStatus.PENDING,
        expiresAt: { $gt: acceptedAt },
      },
      {
        $set: {
          status: InvitationStatus.ACCEPTED,
          acceptedAt,
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      }
    );
  }
}

export const invitationRepository = new InvitationRepository();