import { Router } from "express";
import { userControllers } from "../controlers";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { validateBody } from "../middlewares/validateBody.middleware";
import { verifyEmailExists } from "../middlewares/verifyEmail.middleware";
import { idExists } from "../middlewares/verifyId.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyOwner } from "../middlewares/verifyOwner.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(userCreateSchema),
  verifyEmailExists,
  userControllers.create
);

userRouter.use("/:id", idExists);

userRouter.patch(
  "/:id",
  validateBody(userUpdateSchema),
  verifyToken,
  verifyOwner,
  userControllers.update
);

userRouter.delete(
  "/:id",
verifyToken,
verifyOwner,
  userControllers.destroy
);

export { userRouter };
