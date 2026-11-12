import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ICompanyAdmin } from "../../modules/companyAdmin/model/model";
import { verifyAccessToken } from "../utils/jwt";
import {JwtMessage} from '../constants/messages'

import { IAuthenticatedActorService } from "../services/actorServices/authenticatedActor.service.interface";

import { authenticatedActorService, AuthenticatedActorService } from "../services/actorServices/authenticatedActor.service";
import { ActorType } from "../types";


 const AuthMiddleware =(ActorService:IAuthenticatedActorService)=> async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {

  const token = req.cookies.accessToken;

  if (!token) {
    throw new UnauthorizedError(JwtMessage.ACCESS_TOKEN_REQUIRED);
  }
    const payload = verifyAccessToken(token);
    const actor = await  authenticatedActorService.getAuthenticatedActor(payload.actorType,payload.id)

    if (!actor) {
      throw new UnauthorizedError(JwtMessage.AUTHENTICATED_USER_NOT_FOUND);
    }
    req.user=actor

    next();
};

export const authMiddleware=AuthMiddleware(authenticatedActorService)