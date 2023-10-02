import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

export const verifyOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { sub } = res.locals.decoded;

  if (sub == id ) return next();

  throw new AppError("Insufficient permission", 403);
};
