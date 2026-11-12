import { Types } from "mongoose";
import { ActorType } from "../types";
import { CompanyAdminRole } from "../types";
export interface IActiveActor {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  isActive?: boolean;
}

export interface IPasswordActor extends IActiveActor {
  password: string;
}
export interface AuthenticatedActorContext {
  id: string;
  actorType: ActorType;
  email: string;
  fullName: string;
  companyId?: string;
  companyAdminRole?: CompanyAdminRole;
}