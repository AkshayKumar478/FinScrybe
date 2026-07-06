import { Router } from "express";

import { validateMiddleware } from "../../../common/middlewares/validate.middleware";
import { passwordResetController } from "../controllers/passwordReset.controller";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/passwordReset.validation";

const passwordResetRouter = Router();

passwordResetRouter.post(
  "/forgot-password",
  validateMiddleware({ body: forgotPasswordSchema }),
  passwordResetController.forgotPassword.bind(passwordResetController)
);

passwordResetRouter.post(
  "/reset-password",
  validateMiddleware({ body: resetPasswordSchema }),
  passwordResetController.resetPassword.bind(passwordResetController)
);

export default passwordResetRouter;
