import { QueryOptions, SaveOptions, Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { CompanyAdmin, ICompanyAdmin } from "../model/model";

export interface ICompanyAdminRepository {
  create(
    payload: Partial<ICompanyAdmin>,
    options?: SaveOptions
  ): Promise<ICompanyAdmin>;
  findById(id: string): Promise<ICompanyAdmin | null>;
  findByEmail(email: string): Promise<ICompanyAdmin | null>;
  findByEmailWithPassword(
    email: string
  ): Promise<ICompanyAdmin | null>;
  findByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<ICompanyAdmin[]>;
  findAll(): Promise<ICompanyAdmin[]>;
  findPrimaryByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<ICompanyAdmin | null>;
  updateLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<ICompanyAdmin | null>;
  setActiveStatus(
    id: string,
    isActive: boolean
  ): Promise<ICompanyAdmin | null>;
  updateById(
    id: string,
    update: Partial<ICompanyAdmin>,
    options?: QueryOptions<ICompanyAdmin>
  ): Promise<ICompanyAdmin | null>;
}

export class CompanyAdminRepository
  extends BaseRepository<ICompanyAdmin>
  implements ICompanyAdminRepository
{
  constructor() {
    super(CompanyAdmin);
  }

  async findByEmail(email: string): Promise<ICompanyAdmin | null> {
    return this.findOne({ email });
  }

  async findByEmailWithPassword(
    email: string
  ): Promise<ICompanyAdmin | null> {
    return this.findOne({ email }, "+password");
  }

  async findByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<ICompanyAdmin[]> {
    return this.findMany({ companyId });
  }

  async findAll(): Promise<ICompanyAdmin[]> {
    return this.findMany();
  }

  async findPrimaryByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<ICompanyAdmin | null> {
    return this.findOne({ companyId, isPrimaryAdmin: true });
  }

  async updateLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<ICompanyAdmin | null> {
    return this.updateById(id, { lastLogin });
  }

  async setActiveStatus(
    id: string,
    isActive: boolean
  ): Promise<ICompanyAdmin | null> {
    return this.updateById(id, { isActive });
  }
}

export const companyAdminRepository =
  new CompanyAdminRepository();
