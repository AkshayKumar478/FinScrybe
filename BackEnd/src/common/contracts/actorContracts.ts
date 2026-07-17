import { Types } from "mongoose";
export interface IActiveActor {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  isActive: boolean;
}

export interface IPasswordActor extends IActiveActor {
  password: string;
}
