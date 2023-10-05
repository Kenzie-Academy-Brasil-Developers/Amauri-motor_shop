import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { anouncementControler } from "../controlers";
import {
  anouncementsCreateSchema,
  anouncementsUpdateSchema,
} from "../schemas/annoucements.schema";
import { idExists } from "../middlewares/verifyId.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { veryfyAnouncementId } from "../middlewares/verifyAnouncementId";

export const anouncimentRouter: Router = Router();

anouncimentRouter.post(
  "/:id",
  idExists,
  verifyToken,
  anouncementControler.create
);

anouncimentRouter.get("", anouncementControler.read);

anouncimentRouter.get(
  "/:id",
  veryfyAnouncementId,
  anouncementControler.retrieve
);

anouncimentRouter.put(
  "/:id",
  verifyToken,
  veryfyAnouncementId,
  anouncementControler.update
);

anouncimentRouter.delete(
  "/:id",
  verifyToken,
  veryfyAnouncementId,
  anouncementControler.destroy
);
