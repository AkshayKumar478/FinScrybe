import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ICompanyAdmin } from "../../modules/companyAdmin/model/model";
import { verifyAccessToken } from "../utils/jwt";
import { companyAdminRepository } from "../../modules/companyAdmin/repositories/companyAdmin.repository";
import { BaseRepository } from "../base/base.repository";
import { authenticatedActorService, AuthenticatedActorService } from "../services/authenticatedActor.service";


 export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access token is required");
    }

    const token = authorization.split(" ")[1];
    const payload = verifyAccessToken(token);
    const actor = await authenticatedActorService.findActorById(
      payload.actorType,
      payload.id
    );

    if (!actor) {
      throw new UnauthorizedError("Authenticated user no longer exists");
    }

    if (!actor.isActive) {
      throw new UnauthorizedError("Authenticated user is inactive");
    }

    req.user = {
      id: actor._id.toString(),
      actorType: payload.actorType,
      email: actor.email,
      fullName: actor.fullName,
      isActive: actor.isActive,
      companyAdminRole:
        payload.actorType === "COMPANY_ADMIN"
          ? (actor as ICompanyAdmin).role
          : undefined,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }

    next(new UnauthorizedError("Invalid or expired access token"));
  }
};
