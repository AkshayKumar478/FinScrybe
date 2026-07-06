import { Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { ActorType } from "../../../common/types";
import {
  IPasswordReset,
  PasswordReset,
} from "../models/passwordResetModel";

export interface IPasswordResetRepository {
  create(payload: Partial<IPasswordReset>): Promise<IPasswordReset>;
  findById(id: string): Promise<IPasswordReset | null>;
  findByToken(token: string): Promise<IPasswordReset | null>;
  findActiveByToken(token: string): Promise<IPasswordReset | null>;
  findByUser(
    userId: string | Types.ObjectId,
    userType: ActorType
  ): Promise<IPasswordReset[]>;
  markAsUsed(token: string): Promise<IPasswordReset | null>;
  invalidateUserTokens(
    userId: string | Types.ObjectId,
    userType: ActorType
  ): Promise<number>;
}

export class PasswordResetRepository
  extends BaseRepository<IPasswordReset>
  implements IPasswordResetRepository
{
  constructor() {
    super(PasswordReset);
  }

  async findByToken(
    token: string
  ): Promise<IPasswordReset | null> {
    return this.findOne({ token });
  }

  async findActiveByToken(
    token: string
  ): Promise<IPasswordReset | null> {
    return this.findOne({
      token,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });
  }

  async findByUser(
    userId: string | Types.ObjectId,
    userType: ActorType
  ): Promise<IPasswordReset[]> {
    return this.findMany({ userId, userType });
  }

  async markAsUsed(
    token: string
  ): Promise<IPasswordReset | null> {
    return this.updateOne({ token }, { isUsed: true });
  }

  async invalidateUserTokens(
    userId: string | Types.ObjectId,
    userType: ActorType
  ): Promise<number> {
    const result = await this.updateMany(
      { userId, userType, isUsed: false },
      { isUsed: true }
    );

    return result.modifiedCount;
  }
}

export const passwordResetRepository =
  new PasswordResetRepository();
