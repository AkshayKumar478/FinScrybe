import {  Document, Types } from "mongoose";

export interface IAccountant extends Document {
  companyId: Types.ObjectId;

  fullName: string;
  email: string;
  password: string;

  phoneNumber: string;
  department: string;

  profilePhoto?: string;

  isActive: boolean;

  lastLogin?: Date;

  createdAt: Date;
  updatedAt: Date;
}
