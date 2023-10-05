import { Router } from "express";
import { commentController } from "../controlers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { veryfyAnouncementId } from "../middlewares/verifyAnouncementId";
import { veryfyCommentId } from "../middlewares/veryfyCommentId.middleware";

export const commentRouter: Router = Router();

commentRouter.post(
  "/:id",
  verifyToken,
  veryfyAnouncementId,
  commentController.create
);
commentRouter.get("", verifyToken, commentController.read);

commentRouter.patch(
  "/:id",
  verifyToken,
  veryfyCommentId,
  commentController.update
);

commentRouter.delete(
  "/:id",
  verifyToken,
  veryfyCommentId,
  commentController.destroy
);
