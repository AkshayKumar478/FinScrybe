import { QueryOptions, Types } from "mongoose";

import {IBaseRepository } from "../../../common/base/base.repository.interface";
import { CompanyStatus } from "../../../common/types";
import { ICompany } from "../model/model.interface";


export interface ICompanyRepository extends IBaseRepository<ICompany> {
 
  findCompanyByEmail(
    companyEmail: string
  ): Promise<ICompany | null>;


  findByCompanyAdminId(
    companyAdminId: string | Types.ObjectId
  ): Promise<ICompany | null>;
  
  findByStatus(
    status: CompanyStatus
  ): Promise<ICompany[]>;

  assignCompanyAdmin(
    companyId: string,
    companyAdminId: string | Types.ObjectId,
    options?: QueryOptions<ICompany>
  ): Promise<ICompany | null>;

  updateStatus(
    companyId: string,
    status: CompanyStatus,
    approvedBy?: string | Types.ObjectId,
    approvedAt?: Date
  ): Promise<ICompany | null>;
}
