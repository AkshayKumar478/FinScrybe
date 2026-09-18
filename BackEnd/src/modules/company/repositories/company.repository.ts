import { QueryOptions, SaveOptions, Types } from "mongoose";

import { BaseRepository} from "../../../common/base/base.repository";
import { ICompanyRepository} from "./company,repository.interface";
import { CompanyStatus } from "../../../common/types";
import { Company} from "../model/model";
import { ICompany} from "../model/model.interface";


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

  async findByGstin(gstin: string): Promise<ICompany | null> {
    return this.findOne({ gstin });
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
