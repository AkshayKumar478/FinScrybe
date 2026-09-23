import { Document, Types } from "mongoose";

export interface ICompanyRegistrationStaging extends Document {
  _id: Types.ObjectId;

  companyName: string;
  industry: string;
  companyEmail: string;
  companyPhone: string;
  gstin: string;

  adminFullName: string;
  adminEmail: string;
  adminPassword: string;
  adminPhoneNumber: string;

  otpHash: Promise<string>;
  otpExpiresAt: Date;
  otpAttempts: number;
  emailVerified: boolean;

  expiresAt: Date;

  createdAt: Date;
  updatedAt: Date;
}