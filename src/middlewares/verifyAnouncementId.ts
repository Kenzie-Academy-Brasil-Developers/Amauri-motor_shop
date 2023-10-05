import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/app.error";
import { anouncementRepo } from "../interfaces/anouncement.interface";
import Anouncement from "../entities/anouncements.entity";

export const veryfyAnouncementId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);

  const anouncementRepository: anouncementRepo =
    AppDataSource.getRepository(Anouncement);

  const foundAnouncement: Anouncement | null =
    await anouncementRepository.findOne({
      where: {
        id,
      },
      relations: { images: true, user: true },
    });

  if (!foundAnouncement) throw new AppError("Anouncement not found", 404);

  res.locals = { ...res.locals, foundAnouncement };

  return next();
};
