import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ICompanyAdmin } from "../../modules/companyAdmin/model/model";
import { verifyAccessToken } from "../utils/jwt";
import {JwtMessage} from '../constants/messages'


import { authenticatedActorService, AuthenticatedActorService } from "../services/authenticatedActor.service";


 export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new UnauthorizedError(JwtMessage.ACCESS_TOKEN_REQUIRED);
  }
    const payload = verifyAccessToken(token);
    const actor = await authenticatedActorService.findActorById(
      payload.actorType,
      payload.id
    );

    if (!actor) {
      throw new UnauthorizedError(JwtMessage.AUTHENTICATED_USER_NOT_FOUND);
    }


    req.user = {
      id: actor._id.toString(),
      actorType: payload.actorType,
      email: actor.email,
      fullName: actor.fullName,
  
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

    next(new UnauthorizedError(JwtMessage.INVALID_OR_EXPIRED_ACCESS_TOKEN));
  }
};
