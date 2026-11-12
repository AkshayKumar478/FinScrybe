import { NextFunction, Request, Response } from "express";
import { CompanyAdminMessage, InvitationMessages } from "../../../common/constants/messages";

import { UnauthorizedError } from "../../../common/errors/UnauthorizedError";
import { invitationService } from "../services/invitation.service";
import type { IInvitationService } from "../services/invitation.service.interface";
import type { CreateInvitationInput } from "../validators/invitation.validation";
import { HttpStatus } from "../../../common/constants/httpstatus";
import { ValidateInvitationParams,ValidateInvitationQuery } from "../validators/invitation.validation";
import { IInvitationController } from "./invitation.controller.interface";
  
class InvitationController implements IInvitationController {
  constructor(private readonly service:IInvitationService){
  
  }

  async createAccountantInvitation(req:Request,res:Response):Promise<void>{

   const user = req.user;

if (!user?.companyId) {
  throw new UnauthorizedError(CompanyAdminMessage.COMPANY_ASSOCIAtION_NOT_fOUND);
}

const { id, companyId } = user;
       
    const payload:CreateInvitationInput=req.body
    
  const response= await this.service.createInvitation(payload,companyId,id)
    res.status(HttpStatus.OK).json(response)
    
  }

  validateInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {

  const invitation = await this.service.validateInvitation(
    req.params as ValidateInvitationParams,
    req.query as ValidateInvitationQuery
  );

  res.status(HttpStatus.OK).json(invitation) 
};
  resendInvitation = async (req: Request, res: Response): Promise<void> => {
    const user = req.user;

    if (!user?.companyId) {
      throw new UnauthorizedError(
        CompanyAdminMessage.COMPANY_ASSOCIAtION_NOT_fOUND
      );
    }

    const response = await this.service.resendInvitation(  req.params.invitationId.toString(),user.companyId);

    res.status(HttpStatus.OK).json(response);
  };

  cancelInvitation = async (req: Request,res: Response): Promise<void> => {
    const user = req.user;

    if (!user?.companyId) {
      throw new UnauthorizedError( CompanyAdminMessage.COMPANY_ASSOCIAtION_NOT_fOUND);
    }

    const response = await this.service.cancelInvitation(
      req.params.invitationId.toString(),
      user.companyId
    );

    res.status(HttpStatus.OK).json(response);
  };

  async listCompanyInvitations(req: Request, res: Response): Promise<void> {
  const companyId = req.user?.companyId;

    if (!companyId) {
      throw new UnauthorizedError(CompanyAdminMessage.COMPANY_ASSOCIAtION_NOT_fOUND);
    }

    const invitations = await this.service.listCompanyInvitations(companyId);

    res.status(HttpStatus.OK).json(invitations);
  }
}

export const invitationController = new InvitationController(invitationService);
