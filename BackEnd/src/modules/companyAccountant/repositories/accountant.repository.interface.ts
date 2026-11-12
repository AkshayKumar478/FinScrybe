import { QueryOptions, SaveOptions, Types } from "mongoose";

import { IAccountant } from "../model/accountant.model.interface";
import type { IBaseRepository } from "../../../common/base/base.repository.interface";



export interface IAccountantRepository extends IBaseRepository<IAccountant>{
  create(
    payload: Partial<IAccountant>,
    options?: SaveOptions
  ): Promise<IAccountant>;
  findById(id: string): Promise<IAccountant | null>;
  findByEmail(email: string): Promise<IAccountant | null>;
  findByEmailWithPassword(
    email: string
  ): Promise<IAccountant | null>;
  findByCompanyId(
    companyId: string | Types.ObjectId
  ): Promise<IAccountant[]>;
  findAll(): Promise<IAccountant[]>;
  updateLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IAccountant | null>;
  setActiveStatus(
    id: string,
    isActive: boolean
  ): Promise<IAccountant | null>;
  updateById(
    id: string,
    update: Partial<IAccountant>,
    options?: QueryOptions<IAccountant>
  ): Promise<IAccountant | null>;
}