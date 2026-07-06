import { QueryOptions, SaveOptions, Types } from "mongoose";

import { BaseRepository } from "../../../common/base/base.repository";
import { CompanyStatus } from "../../../common/types";
import { Company, ICompany } from "../model/model";

export interface ICompanyRepository {
  create(
    payload: Partial<ICompany>,
    options?: SaveOptions
  ): Promise<ICompany>;
  findById(id: string): Promise<ICompany | null>;
  findByEmail(companyEmail: string): Promise<ICompany | null>;
  findByCompanyAdminId(
    companyAdminId: string | Types.ObjectId
  ): Promise<ICompany | null>;
  findByStatus(status: CompanyStatus): Promise<ICompany[]>;
  findAll(): Promise<ICompany[]>;
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

  async findByEmail(
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

  async findAll(): Promise<ICompany[]> {
    return this.findMany();
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
