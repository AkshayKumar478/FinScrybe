export {};
import { Schema, model, models, Document } from "mongoose";

export interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePhoto?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
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
  }
);

export const Admin =
  models.Admin || model<IAdmin>("Admin", adminSchema);