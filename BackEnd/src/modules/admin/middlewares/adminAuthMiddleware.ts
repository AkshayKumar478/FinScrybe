import { NextFunction,Request,Response } from "express";
import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { verifyAccessToken } from "../../../common/utils/jwt";
import { authenticatedActorService } from "../../../common/services/authenticatedActor.service";
import { ICompanyAdmin } from "../../companyAdmin/model/model";

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
    const actor = await authenticatedActorService.findActor(
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
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }

    next(new UnauthorizedError("Invalid or expired access token"));
  }
};
