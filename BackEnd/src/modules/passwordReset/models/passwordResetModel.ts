import { Schema, model, models, Document, Types } from "mongoose";
import { ActorType } from "../../../common/types/index";

export interface IPasswordReset extends Document {
  userId: Types.ObjectId;

  userType: ActorType;

  token: string;

  expiresAt: Date;

  isUsed: boolean;

  createdAt: Date;
}

const passwordResetSchema = new Schema<IPasswordReset>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    userType: {
      type: String,
      enum: Object.values(ActorType),
      required: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);

passwordResetSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const PasswordReset =
  models.PasswordReset ||
  model<IPasswordReset>(
    "PasswordReset",
    passwordResetSchema
  );