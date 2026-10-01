import {  Document, Types } from "mongoose";


export interface ICompany extends Document {
  companyName: string;
  industry: string;
  companyEmail: string;
  companyPhone: string;
  gstin: string;

  companyAdminId?: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}
