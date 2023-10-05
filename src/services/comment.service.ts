import { AppDataSource } from "../data-source";
import Anouncement from "../entities/anouncements.entity";
import Comment from "../entities/comments.entity";
import User from "../entities/user.entity";
import { AppError } from "../errors/app.error";
import {
  commentCreate,
  commentRepo,
  commentReturn,
  commentUpdate,
} from "../interfaces/comment.interface";
import { UserRepo } from "../interfaces/user.interface";
import { commentReturnSchema } from "../schemas/comment.schema";

const create = async (
  payload: commentCreate,
  userId: number,
  anouncement: Anouncement
) => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const commentRepository: commentRepo = AppDataSource.getRepository(Comment);

  const user: User = (await userRepository.findOneBy({ id: userId }))!;

  const comment: Comment = commentRepository.create({
    ...payload,
    user: user,
    anouncement: anouncement,
  });
  await commentRepository.save(comment);

  return comment;
};

const read = async (): Promise<Comment[]> => {
  const commentRepository: commentRepo = AppDataSource.getRepository(Comment);

  const reads = await commentRepository.find({
    relations: { user: true, anouncement: true },
  });

  return reads;
};

const update = async (
  comment: Comment,
  payload: commentUpdate,
  userId: number
) => {
  const repo: commentRepo = AppDataSource.getRepository(Comment);

  if (userId == comment.user.id) {
    const commentUpd: Comment = repo.create({
      ...comment,
      ...payload,
    });

    const commentAtualizado: Comment = await repo.save(commentUpd)!;

    return commentAtualizado;
  }
  throw new AppError("Insufficient permission", 403);
};

const destroy = async (comment: Comment, userId: number): Promise<void> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);
  const repo: commentRepo = AppDataSource.getRepository(Comment);

  const user: User = (await userRepository.findOneBy({ id: userId }))!;

  if (
    user.tipo_de_conta == "Anunciante" &&
    userId == comment.anouncement.user.id
  ) {
    await repo.remove(comment);
  } else if (userId == comment.user.id) {
    await repo.remove(comment);
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};
export default { create, read, destroy, update };
