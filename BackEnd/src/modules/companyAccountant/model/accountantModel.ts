import { Schema, model, models, Document, Types } from "mongoose";

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

const accountantSchema = new Schema<IAccountant>(
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

    department: {
      type: String,
      required: true,
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
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

accountantSchema.index({ companyId: 1 });

export const Accountant =
  models.Accountant ||
  model<IAccountant>("Accountant", accountantSchema);