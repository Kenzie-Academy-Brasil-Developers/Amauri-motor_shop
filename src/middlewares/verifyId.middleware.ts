import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/app.error";
import { UserRepo } from "../interfaces/user.interface";
import User from "../entities/user.entity";

export const idExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const foundEntity: User | null = await userRepository.findOne({
    where: {
      id,
    },
    relations: { address: true },
  });

  if (!foundEntity) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, foundEntity };

  return next();
};
