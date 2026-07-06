import { Document, Schema, Types, model, models } from "mongoose";

import {
  ActorType,
  CompanyAdminRole,
  InvitationStatus,
} from "../../../common/types";

export interface ICompanyAdminInvitation extends Document {
  companyId: Types.ObjectId;
  invitedBy: Types.ObjectId;
  invitedByType: ActorType;
  email: string;
  role: CompanyAdminRole;
  token: string;
  status: InvitationStatus;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
}

const companyAdminInvitationSchema =
  new Schema<ICompanyAdminInvitation>(
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
      role: {
        type: String,
        enum: Object.values(CompanyAdminRole),
        default: CompanyAdminRole.EXECUTIVE,
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

companyAdminInvitationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const CompanyAdminInvitation =
  models.CompanyAdminInvitation ||
  model<ICompanyAdminInvitation>(
    "CompanyAdminInvitation",
    companyAdminInvitationSchema
  );
