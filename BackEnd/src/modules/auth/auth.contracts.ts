import { Types } from "mongoose";

import { ActorType, CompanyStatus } from "../../common/types";

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

export interface ICompanyRegistrationResult {
  company: ICompanySummary;
  companyAdmin: IActiveActor;
}

export interface IAuthLoginRepository {
  findSuperAdminByEmail(email: string): Promise<IPasswordActor | null>;
  updateSuperAdminLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IActiveActor | null>;
  findCompanyAdminByEmail(
    email: string
  ): Promise<ICompanyScopedActor | null>;
  updateCompanyAdminLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IActiveActor | null>;
  findAccountantByEmail(
    email: string
  ): Promise<ICompanyScopedActor | null>;
  updateAccountantLastLogin(
    id: string,
    lastLogin: Date
  ): Promise<IActiveActor | null>;
  findCompanyById(id: string): Promise<ICompanySummary | null>;
  findCompanyByEmail(email: string): Promise<ICompanySummary | null>;
  createCompanyRegistration(
    payload: ICompanyRegistrationPayload
  ): Promise<ICompanyRegistrationResult>;
}

export interface IPasswordResetActorRepository {
  findActorByEmail(
    actorType: ActorType,
    email: string
  ): Promise<IActiveActor | null>;
  updateActorPassword(
    actorType: ActorType,
    actorId: string,
    password: string
  ): Promise<IActiveActor | null>;
}

export interface IAuthenticatedActorRepository {
  findActorById(
    actorType: ActorType,
    actorId: string
  ): Promise<IActiveActor | null>;
}
