import { Schema, model, models, Types } from "mongoose";
import { ICompanyRegistrationStaging } from './registrationStaging.model.interface';

const companyRegistrationStagingSchema =
  new Schema<ICompanyRegistrationStaging>(
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
        lowercase: true,
        trim: true,
      },

      companyPhone: {
        type: String,
        required: true,
        trim: true,
      },

      gstin: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
      },

      adminFullName: {
        type: String,
        required: true,
        trim: true,
      },

      adminEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      adminPassword: {
        type: String,
        required: true,
      },

      adminPhoneNumber: {
        type: String,
        required: true,
        trim: true,
      },

      otpHash: {
        type: String,
        required: true,
      },

      otpExpiresAt: {
        type: Date,
        required: true,
      },

      otpAttempts: {
        type: Number,
        default: 0,
      },

      emailVerified: {
        type: Boolean,
        default: false,
      },

      expiresAt: {
        type: Date,
        required: true,
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

companyRegistrationStagingSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const CompanyRegistrationStaging =
  models.CompanyRegistrationStaging ||
  model<ICompanyRegistrationStaging>(
    "CompanyRegistrationStaging",
    companyRegistrationStagingSchema
  );