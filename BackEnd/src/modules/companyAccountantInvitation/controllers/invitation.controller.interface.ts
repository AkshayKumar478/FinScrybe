import { Request,Response } from "express";
export interface IInvitationController{
   createAccountantInvitation(req: Request,res: Response): Promise<void>;

  resendInvitation( req: Request,res: Response): Promise<void>;

  cancelInvitation(req: Request,res: Response): Promise<void>;

  validateInvitation( req: Request,res: Response): Promise<void>;
  listCompanyInvitations(req: Request, res: Response): Promise<void>;
}