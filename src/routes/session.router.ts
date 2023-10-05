import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionCreateSchema } from "../schemas/session.schema";
import { sessionControler } from "../controlers";

export const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  validateBody(sessionCreateSchema),
  sessionControler.create
);
