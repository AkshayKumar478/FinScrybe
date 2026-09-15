import {Document} from 'mongoose'
export interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePhoto?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
