import { NextFunction, Request, Response } from "express";

import { ForbiddenError } from "../errors/ForbiddenError";
import { ActorType, CompanyAdminRole } from "../types";

type AuthorizationOptions = {
  actorTypes: ActorType[];
  companyAdminRoles?: CompanyAdminRole[];
};

export const roleMiddleware = (
  ...roles: Array<ActorType | CompanyAdminRole>
) => {
  const options = normalizeAuthorizationOptions(roles);

  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ForbiddenError("Authentication is required"));
    }

    if (!options.actorTypes.includes(req.user.actorType)) {
      return next(new ForbiddenError("You do not have access to this resource"));
    }

    if (
      req.user.actorType === ActorType.COMPANY_ADMIN &&
      options.companyAdminRoles?.length &&
      (!req.user.companyAdminRole ||
        !options.companyAdminRoles.includes(req.user.companyAdminRole))
    ) {
      return next(new ForbiddenError("You do not have permission for this action"));
    }

    next();
  };
};

const normalizeAuthorizationOptions = (
  roles: Array<ActorType | CompanyAdminRole>
): AuthorizationOptions => {
  const actorTypes = roles.filter((role): role is ActorType =>
    Object.values(ActorType).includes(role as ActorType)
  );

  const companyAdminRoles = roles.filter((role): role is CompanyAdminRole =>
    Object.values(CompanyAdminRole).includes(role as CompanyAdminRole)
  );

  if (companyAdminRoles.length > 0 && actorTypes.length === 0) {
    actorTypes.push(ActorType.COMPANY_ADMIN);
  }

  return {
    actorTypes,
    companyAdminRoles,
  };
};
