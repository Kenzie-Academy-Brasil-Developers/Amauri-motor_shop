import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { anouncementControler} from "../controlers";
import { anouncementsCreateSchema } from "../schemas/annoucements.schema";
import { idExists } from "../middlewares/verifyId.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";

export const anouncimentRouter: Router = Router();



anouncimentRouter.post(
  "/:id",
  idExists,verifyToken,anouncementControler.create
);
