import jwt, {
    JwtPayload,
    Secret,
    SignOptions,
} from "jsonwebtoken";
import { env } from "../../config/env";
import { ActorType } from "../types/index";
import type {StringValue} from 'ms'
import { UnauthorizedError } from "../errors/UnauthorizedError";
import {CompanyRegistrationMessage} from '../constants/messages'
export interface TokenPayload extends JwtPayload {
    id: string;
    actorType: ActorType;
}
export interface RegistrationVerificationPayload {
  registrationId: string;
  purpose: "REGISTRATION_VERIFICATION";
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



export const generateRegistrationVerificationToken = (
  registrationId: string
): string => {
  return jwt.sign(
    {
      registrationId,
      purpose: "REGISTRATION_VERIFICATION",
    },
    env.REGISTRATION_VERIFICATION_TOKEN_SECRET,
    {
      expiresIn: env.REGISTRATION_VERIFICATION_TOKEN_EXPIRES_IN as StringValue
    }
  )

}

  export  const verifyRegistrationVerificationToken=(token:string)=>{
      const payload=jwt.verify(token, env.REGISTRATION_VERIFICATION_TOKEN_SECRET  ) as RegistrationVerificationPayload
      if(payload.purpose!=="REGISTRATION_VERIFICATION"){
        throw new UnauthorizedError(CompanyRegistrationMessage.REGISTRATION_TOKEN_iNVALID)
      }

      return payload
  }