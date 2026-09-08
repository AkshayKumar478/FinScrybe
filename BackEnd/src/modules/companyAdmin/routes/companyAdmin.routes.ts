import { Router } from "express";

import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { companyAdminController } from "../controllers/companyAdmin.controller";
import { companyAdminLoginSchema } from "../validators/companyAdmin.validation";

const companyAdminRouter = Router();

companyAdminRouter.post(
  "/login",
  validateMiddleware({ body: companyAdminLoginSchema }),
  companyAdminController.login.bind(companyAdminController)
);

companyAdminRouter.post(
  "/logout",
  companyAdminController.logout.bind(companyAdminController)
);

export default companyAdminRouter;
