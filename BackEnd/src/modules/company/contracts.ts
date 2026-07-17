import { Types } from "mongoose";
import { CompanyStatus } from "../../common/types";
import { IPasswordActor } from "../../common/contracts/actorContracts";
import { IActiveActor } from "../../common/contracts/actorContracts";

export interface ICompanyScopedActor extends IPasswordActor {
  companyId: Types.ObjectId;
}

export interface ICompanySummary {
  _id: Types.ObjectId;
  companyName: string;
  companyEmail: string;
  status: CompanyStatus;
}

export interface ICompanyRegistrationPayload {
  company: {
    companyName: string;
    industry: string;
    companyEmail: string;
    companyPhone: string;
  };
  companyAdmin: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
}

export interface ICompanyScopedActor extends IPasswordActor {
  companyId: Types.ObjectId;
}

export interface ICompanyRegistrationResult {
  company: ICompanySummary;
  companyAdmin: IActiveActor;
}
