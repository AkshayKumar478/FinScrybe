import { Types } from "mongoose";

import { ActorType, CompanyStatus } from "../../common/types";

interface IActiveActor {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  isActive: boolean;
}

 interface IPasswordActor extends IActiveActor {
  password: string;
}

 interface ICompanyScopedActor extends IPasswordActor {
  companyId: Types.ObjectId;
}

 interface ICompanySummary {
  _id: Types.ObjectId;
  companyName: string;
  companyEmail: string;
  status: CompanyStatus;
}

 interface ICompanyRegistrationPayload {
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

 interface ICompanyRegistrationResult {
  company: ICompanySummary;
  companyAdmin: IActiveActor;
}

