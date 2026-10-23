import { Schema, model, models, Document, Types } from "mongoose";
import {
  InvitationStatus,
} from "../../../common/types/index";
import {IInvitation} from './invitation.model.interface'


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
  cancelledAt: {
  type: Date,
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