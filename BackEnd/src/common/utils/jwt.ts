import jwt, {
    JwtPayload,
    Secret,
    SignOptions,
} from "jsonwebtoken";
import { env } from "../../config/env";
import { ActorType } from "../types/index";

export interface TokenPayload extends JwtPayload {
    id: string;
    actorType: ActorType;
}

export const generateAccessToken = (
    payload: TokenPayload
): string => {
    return jwt.sign(
        payload,
        env.JWT_ACCESS_SECRET as Secret,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        } as SignOptions
    );
};

export const generateRefreshToken = (
    payload: TokenPayload
): string => {
    return jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET as Secret,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        } as SignOptions
    );
};

export const verifyAccessToken = (
    token: string
): TokenPayload => {
    return jwt.verify(
        token,
        env.JWT_ACCESS_SECRET as Secret
    ) as TokenPayload;
};

export const verifyRefreshToken = (
    token: string
): TokenPayload => {
    return jwt.verify(
        token,
        env.JWT_REFRESH_SECRET as Secret
    ) as TokenPayload;
};