import "express";
import { ActorType } from "./actorType.enum";
import { CompanyAdminRole } from "./companyAdminRole.enum";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        actorType: ActorType;
        email: string;
        fullName: string;
        isActive: boolean;
        companyAdminRole?: CompanyAdminRole;
      } | null;
    }
  }
}

export {};
