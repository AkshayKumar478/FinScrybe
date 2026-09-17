import {  Document, Types } from "mongoose";
import { CompanyStatus } from '../../../common/types/index';


export interface ICompany extends Document {
  companyName: string;
  industry: string;
  companyEmail: string;
  companyPhone: string;

  companyAdminId?: Types.ObjectId;

  status: CompanyStatus;

  approvedBy?: Types.ObjectId;
  approvedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}