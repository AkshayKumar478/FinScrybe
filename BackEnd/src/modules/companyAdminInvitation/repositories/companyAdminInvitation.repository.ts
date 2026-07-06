import { QueryOptions, SaveOptions, Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { InvitationStatus } from "../../../common/types";
import {
  CompanyAdminInvitation,
  ICompanyAdminInvitation,
} from "../model/companyAdminInvitationModel";

export interface ICompanyAdminInvitationRepository {
  create(
    payload: Partial<ICompanyAdminInvitation>,
    options?: SaveOptions
  ): Promise<ICompanyAdminInvitation>;
  findById(id: string): Promise<ICompanyAdminInvitation | null>;
  findByToken(token: string): Promise<ICompanyAdminInvitation | null>;
  findPendingByEmailAndCompany(
    companyId: string | Types.ObjectId,
    email: string
  ): Promise<ICompanyAdminInvitation | null>;
  refreshInvitation(
    id: string,
    token: string,
    expiresAt: Date,
    options?: QueryOptions<ICompanyAdminInvitation>
  ): Promise<ICompanyAdminInvitation | null>;
  updateStatus(
    id: string,
    status: InvitationStatus,
    acceptedAt?: Date,
    options?: QueryOptions<ICompanyAdminInvitation>
  ): Promise<ICompanyAdminInvitation | null>;
}

export class CompanyAdminInvitationRepository
  extends BaseRepository<ICompanyAdminInvitation>
  implements ICompanyAdminInvitationRepository
{
  constructor() {
    super(CompanyAdminInvitation);
  }

  async findByToken(
    token: string
  ): Promise<ICompanyAdminInvitation | null> {
    return this.findOne({ token });
  }

  async findPendingByEmailAndCompany(
    companyId: string | Types.ObjectId,
    email: string
  ): Promise<ICompanyAdminInvitation | null> {
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
    options: QueryOptions<ICompanyAdminInvitation> = { new: true }
  ): Promise<ICompanyAdminInvitation | null> {
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
    options: QueryOptions<ICompanyAdminInvitation> = { new: true }
  ): Promise<ICompanyAdminInvitation | null> {
    return this.updateById(id, { status, acceptedAt }, options);
  }
}

export const companyAdminInvitationRepository =
  new CompanyAdminInvitationRepository();
