import "express";
import { ActorType } from "./actorType.enum";
import { CompanyAdminRole } from "./companyAdminRole.enum";
import { AuthenticatedActorContext } from "../contracts/actorContracts";

declare global {
  namespace Express {
    interface Request {
      user?:AuthenticatedActorContext;
    }
  }
}

export {};
