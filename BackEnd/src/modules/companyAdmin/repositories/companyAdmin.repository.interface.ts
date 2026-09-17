
import { QueryOptions, SaveOptions, Types } from "mongoose";
import { ICompanyAdmin } from "../model/model";


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
