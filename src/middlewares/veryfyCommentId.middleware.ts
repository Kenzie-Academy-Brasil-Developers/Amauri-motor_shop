import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/app.error";
import { commentRepo } from "../interfaces/comment.interface";
import Comment from "../entities/comments.entity";

export const veryfyCommentId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const CommentRepository: commentRepo = AppDataSource.getRepository(Comment);

  const foundComment: Comment | null = await CommentRepository.findOne({
    where: {
      id,
    },
    relations: { user: true, anouncement: { user: true } },
  });

  if (!foundComment) throw new AppError("Comment not found", 404);

  res.locals = { ...res.locals, foundComment };

  return next();
};
