import { QueryOptions, Types } from "mongoose";

import {IBaseRepository } from "../../../common/base/base.repository.interface";
import { ICompany } from "../model/model.interface";


export interface ICompanyRepository extends IBaseRepository<ICompany> {
 
  findCompanyByEmail(
    companyEmail: string
  ): Promise<ICompany | null>;

  findByGstin(gstin: string): Promise<ICompany | null>;


  findByCompanyAdminId(
    companyAdminId: string | Types.ObjectId
  ): Promise<ICompany | null>;
  
  assignCompanyAdmin(
    companyId: string,
    companyAdminId: string | Types.ObjectId,
    options?: QueryOptions<ICompany>
  ): Promise<ICompany | null>;

}
