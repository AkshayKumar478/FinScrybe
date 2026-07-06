import { ActorType, CompanyStatus } from "../../../common/types";
import {
  IActiveActor,
  ICompanyScopedActor,
  ICompanySummary,
  IPasswordActor,
} from "../auth.contracts";

export interface AuthUserResponse {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  actorType: ActorType;
}

export interface AuthCompanyResponse {
  id: string;
  companyName: string;
  companyEmail: string;
  status: CompanyStatus;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUserResponse;
  company?: AuthCompanyResponse;
}

export interface CompanyRegistrationResponse {
  message: string;
  company: AuthCompanyResponse;
  companyAdmin: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

export function mapActorToAuthUser(
  actor: IActiveActor | ICompanyScopedActor | IPasswordActor,
  actorType: ActorType
): AuthUserResponse {
  return {
    id: actor._id.toString(),
    fullName: actor.fullName,
    email: actor.email,
    phoneNumber: actor.phoneNumber,
    profilePhoto: actor.profilePhoto,
    actorType,
  };
}

export function mapCompanySummary(
  company: ICompanySummary
): AuthCompanyResponse {
  return {
    id: company._id.toString(),
    companyName: company.companyName,
    companyEmail: company.companyEmail,
    status: company.status,
  };
}

export function mapCompanyRegistrationResponse(
  company: ICompanySummary,
  companyAdmin: IActiveActor
): CompanyRegistrationResponse {
  return {
    message: "Company registration submitted successfully",
    company: mapCompanySummary(company),
    companyAdmin: {
      id: companyAdmin._id.toString(),
      fullName: companyAdmin.fullName,
      email: companyAdmin.email,
      phoneNumber: companyAdmin.phoneNumber,
    },
  };
}

export function mapAuthResponse(params: {
  message: string;
  accessToken: string;
  refreshToken: string;
  actorType: ActorType;
  user: IActiveActor | ICompanyScopedActor | IPasswordActor;
  company?: ICompanySummary;
}): AuthResponse {
  return {
    message: params.message,
    accessToken: params.accessToken,
    refreshToken: params.refreshToken,
    user: mapActorToAuthUser(params.user, params.actorType),
    company: params.company
      ? mapCompanySummary(params.company)
      : undefined,
  };
}
