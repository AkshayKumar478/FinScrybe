import { ActorType } from "../types";

import { ICompanyAdmin } from "../../modules/companyAdmin/model/model";
import { IAccountant } from "../../modules/companyAccountant/model/accountantModel";
import { IAdmin } from "../../modules/admin/model/admin.model.interface";



export type AuthActor = IAdmin | ICompanyAdmin | IAccountant;

export interface IAuthenticatedActorService {
  findActor(actorType: ActorType, id: string): Promise<AuthActor | null>;
  findActorByEmail(
    actorType: ActorType,
    email: string
  ): Promise<AuthActor | null>;
  findActorById(
    actorType: ActorType,
    actorId: string
  ): Promise<AuthActor | null>;
}
