import { Types } from "mongoose";
import { IPasswordActor } from "./actorContracts";
export interface ICompanyScopedActor extends IPasswordActor {
  companyId: Types.ObjectId;
}