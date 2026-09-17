import { NextFunction,Request,Response } from "express";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { verifyAccessToken } from "../../../common/utils/jwt";
import { authenticatedActorService } from "../../../common/services/authenticatedActor.service";
import {JwtMessage} from '../../../common/constants/messages'
import { jwt } from "zod";

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
    const actor = await authenticatedActorService.findActor(
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
      
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }

    next(new UnauthorizedError(JwtMessage.INVALID_OR_EXPIRED_ACCESS_TOKEN));
  }
};
