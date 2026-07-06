import { Schema, model, models, Document, Types } from "mongoose";
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

const companySchema = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    companyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    companyPhone: {
      type: String,
      required: true,
      trim: true,
    },

    companyAdminId: {
      type: Schema.Types.ObjectId,
      ref: "CompanyAdmin",
    },

    status: {
      type: String,
      enum: Object.values(CompanyStatus),
      default: CompanyStatus.PENDING,
      index: true,
    },

    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },

    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Company =
  models.Company || model<ICompany>("Company", companySchema);