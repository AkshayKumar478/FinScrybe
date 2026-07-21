import {BaseRepository,IBaseRepository } from "../../../common/base/base.repository";
import { QueryOptions,Model } from "mongoose";
import { Admin, IAdmin } from "../model/admin.model";

export interface IAdminRepository extends IBaseRepository<IAdmin>  {
  findAll(): Promise<IAdmin[]>;
  findByEmail(email: string): Promise<IAdmin | null>;
  findByEmailWithPassword(email: string): Promise<IAdmin | null>;
  updateLastLogin(id: string, lastLogin: Date): Promise<IAdmin | null>;
  updatePassword(id:string,password:string): Promise<IAdmin|null>
  updateById(
    id: string,
    update: Partial<IAdmin>,
    options?: QueryOptions<IAdmin>
  ): Promise<IAdmin | null>;
}

export class AdminRepository
  extends BaseRepository<IAdmin>
  implements IAdminRepository
{
  constructor(adminModel:Model<IAdmin>) {
    super(adminModel);
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    return this.findOne({ email });
  }

  async findAll(): Promise<IAdmin[]> {
    return this.findMany();
  }

  async findByEmailWithPassword(
    email: string
  ): Promise<IAdmin | null> {
    return this.findOne({ email }, "+password");
  }

  async updateLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IAdmin | null> {
    return this.updateById(id, { lastLogin });
  }
  async updatePassword(
  id: string,
  password: string
): Promise<IAdmin | null> {
  return this.updateById(id, { password });
}

 
}

export const adminRepository = new AdminRepository(Admin);
