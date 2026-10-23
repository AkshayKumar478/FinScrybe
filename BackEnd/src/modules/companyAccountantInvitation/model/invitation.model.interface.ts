import {  Document, Types } from "mongoose";
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
  cancelledAt?: Date;
  acceptedAt?: Date;

  createdAt: Date;
}