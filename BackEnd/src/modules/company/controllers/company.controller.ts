import { Request, Response } from "express";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import {ICompanyService} from '../services/company.service.interface'
import { companyService } from "../services/company.service";
import {HttpStatus } from '../../../common/constants/httpstatus'
import {ICompanyController} from './company.controller.interface' 
import { JwtMessage} from '../../../common/constants/messages'


class CompanyController implements ICompanyController {
  constructor(private readonly service: ICompanyService) {}
   
 async startRegistration(req:Request,res:Response):Promise<void>{
    const response = await this.service.startRegistration(req.body);
    res.status(HttpStatus.CREATED).json(response);
 }
  async resendRegistrationOtp(req:Request,res:Response):Promise<void>{
    const { email } = req.body;
    const response = await this.service.resendOtp(email);
    res.status(HttpStatus.OK).json(response);
  }

 async verifyRegistrationOtp(req:Request,res:Response):Promise<void>{
    const { email, otp } = req.body;
    const response = await this.service.verifyRegistrationOtp(email, otp);
    res.status(HttpStatus.OK).json(response);
 }

 async completeRegistration (req:Request,res:Response):Promise<void>{
    const { verificationToken } = req.body;
    const response = await this.service.completeRegistration(verificationToken);
    res.status(HttpStatus.CREATED).json(response);
 }

  async listAll(req: Request, res: Response): Promise<void> {
    const response = await this.service.listAll();
    res.status(HttpStatus.OK).json(response);
  }

  async getCurrentCompany(
    req: Request,
    res: Response
  ): Promise<void> {
    if (!req.user?.id || !req.user.actorType) {
      throw new UnauthorizedError(JwtMessage.AUTHENTICATION_REQUIRED);
    }

    const response = await this.service.getCurrentUsersCompany(
      req.user.actorType,
      req.user.id
    );
    res.status(HttpStatus.OK).json(response);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const response = await this.service.getById(req.params.companyId as string);
    res.status(HttpStatus.OK).json(response);
  }

}

export const companyController = new CompanyController(companyService);
