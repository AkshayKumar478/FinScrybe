import { Router } from "express";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import { roleMiddleware } from "../../../common/middlewares/role.middleware";
import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { ActorType } from "../../../common/types";
import { companyRegistrationSchema,verifyRegistrationOtpSchema,completeRegistrationSchema,resendRegistrationOtpSchema,companyIdParamsSchema } from "../validators/company.validation";
import { companyController } from "../controllers/company.controller";


const companyRouter = Router();
 companyRouter.post("/registration/start",
  validateMiddleware({body:companyRegistrationSchema}),
  companyController.startRegistration.bind(companyController)
 )

 companyRouter.post('/registration/verify-otp',
  validateMiddleware({body:verifyRegistrationOtpSchema}),
  companyController.verifyRegistrationOtp.bind(companyController)
)
companyRouter.post('/registration/resend-otp',
  validateMiddleware({body:resendRegistrationOtpSchema}),
  companyController.resendRegistrationOtp.bind(companyController)
)
 companyRouter.post('/registration/complete',
  validateMiddleware({body:completeRegistrationSchema}),
  companyController.completeRegistration.bind(companyController)
)


companyRouter.get(
  "/",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  companyController.listAll.bind(companyController)
);

companyRouter.get(
  "/:companyId",
  authMiddleware,
  roleMiddleware(ActorType.ADMIN),
  validateMiddleware({ params: companyIdParamsSchema }),
  companyController.getById.bind(companyController)
);

export default companyRouter;
