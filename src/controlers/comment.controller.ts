import { Request, Response } from "express";
import { commentService } from "../services";
import { commentReturn } from "../interfaces/comment.interface";
import Comment from "../entities/comments.entity";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);
  const comment = await commentService.create(
    req.body,
    userId,
    res.locals.foundAnouncement
  );
  return res.status(201).json(comment);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const comments: Comment[] = await commentService.read();
  return res.status(200).json(comments);
};
const update = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);

  const comments = await commentService.update(
    res.locals.foundComment,
    req.body,
    userId
  );
  return res.status(200).json(comments);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);

  await commentService.destroy(res.locals.foundComment, userId);
  return res.status(204).json();
};

export default { create, read, destroy, update };
