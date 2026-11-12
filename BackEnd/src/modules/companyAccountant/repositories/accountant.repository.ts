import { QueryOptions, SaveOptions, Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import {
  Accountant,
} from "../model/accountant.model";
import { IAccountant } from "../model/accountant.model.interface";
import { IAccountantRepository } from "./accountant.repository.interface";


export class AccountantRepository
  extends BaseRepository<IAccountant>
  implements IAccountantRepository
{
  constructor() {
    super(Accountant);
  }

  async findByEmail(email: string): Promise<IAccountant | null> {
    return this.findOne({ email });
  }

  async findByEmailWithPassword(
    email: string
  ): Promise<IAccountant | null> {
    return this.findOne({ email }, "+password");
  }

  async findByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<IAccountant[]> {
    return this.findMany({ companyId });
  }

  async findAll(): Promise<IAccountant[]> {
    return this.findMany();
  }

  async updateLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IAccountant | null> {
    return this.updateById(id, { lastLogin });
  }

  async setActiveStatus(
    id: string,
    isActive: boolean
  ): Promise<IAccountant | null> {
    return this.updateById(id, { isActive });
  }
}

export const accountantRepository = new AccountantRepository();
