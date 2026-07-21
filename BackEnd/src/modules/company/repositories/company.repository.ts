import { QueryOptions, SaveOptions, Types } from "mongoose";

import { BaseRepository, IBaseRepository } from "../../../common/base/base.repository";
import { CompanyStatus } from "../../../common/types";
import { Company, ICompany } from "../model/model";
import { ICompanyRegistrationPayload,ICompanyRegistrationResult } from "../contracts";
import { companyAdminRepository } from "../../companyAdmin/repositories/companyAdmin.repository";
import { ICompanyAdmin } from "../../companyAdmin/model/model";
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

export class CompanyRepository
  extends BaseRepository<ICompany>
  implements ICompanyRepository
{
  constructor() {
    super(Company);
  }

  async findCompanyByEmail(
    companyEmail: string
  ): Promise<ICompany | null> {
    return this.findOne({ companyEmail });
  }

  async findByCompanyAdminId(
    companyAdminId: string | Types.ObjectId
  ): Promise<ICompany | null> {
    return this.findOne({ companyAdminId });
  }

  async findByStatus(status: CompanyStatus): Promise<ICompany[]> {
    return this.findMany({ status });
  }

  async assignCompanyAdmin(
    companyId: string,
    companyAdminId: string | Types.ObjectId,
    options?: QueryOptions<ICompany>
  ): Promise<ICompany | null> {
    return this.updateById(companyId, { companyAdminId }, options);
  }

  async updateStatus(
    companyId: string,
    status: CompanyStatus,
    approvedBy?: string | Types.ObjectId,
    approvedAt?: Date
  ): Promise<ICompany | null> {
    return this.updateById(companyId, {
      status,
      approvedBy,
      approvedAt,
    });
  }
}

export const companyRepository = new CompanyRepository();
