import { Schema, model, models, Document, Types } from "mongoose";
import { CompanyAdminRole } from '../../../common/types/index';

export interface ICompanyAdmin extends Document {
  companyId: Types.ObjectId;

  fullName: string;
  email: string;
  password: string;

  phoneNumber: string;
  profilePhoto?: string;

  role: CompanyAdminRole;

  invitedBy?: Types.ObjectId;

  isPrimaryAdmin: boolean;
  isActive: boolean;

  lastLogin?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const companyAdminSchema = new Schema<ICompanyAdmin>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: Object.values(CompanyAdminRole),
      default: CompanyAdminRole.EXECUTIVE,
    },

    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "CompanyAdmin",
    },

    isPrimaryAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


companyAdminSchema.index({ companyId: 1, email: 1 });

export const CompanyAdmin =
  models.CompanyAdmin ||
  model<ICompanyAdmin>("CompanyAdmin", companyAdminSchema);