import { Schema, model, models } from "mongoose";

import {ICompany} from './model.interface'

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

    gstin: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    companyAdminId: {
      type: Schema.Types.ObjectId,
      ref: "CompanyAdmin",
    },

  },
  {
    timestamps: true,
  }
);

export const Company =
  models.Company || model<ICompany>("Company", companySchema);
