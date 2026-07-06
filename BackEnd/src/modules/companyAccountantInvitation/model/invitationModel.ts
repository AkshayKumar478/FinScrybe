import { Schema, model, models, Document, Types } from "mongoose";
import {
  ActorType,
  InvitationStatus,
} from "../../../common/types/index";

export interface IInvitation extends Document {
  companyId: Types.ObjectId;

  invitedBy: Types.ObjectId;
  invitedByType: ActorType;

  email: string;

  department: string;

  token: string;

  status: InvitationStatus;

  expiresAt: Date;
  acceptedAt?: Date;

  createdAt: Date;
}

const invitationSchema = new Schema<IInvitation>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    invitedBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    invitedByType: {
      type: String,
      enum: Object.values(ActorType),
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: Object.values(InvitationStatus),
      default: InvitationStatus.PENDING,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    acceptedAt: {
      type: Date,
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

invitationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const Invitation =
  models.Invitation ||
  model<IInvitation>("Invitation", invitationSchema);