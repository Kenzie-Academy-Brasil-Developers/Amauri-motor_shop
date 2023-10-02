import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {tipo_de_conta} = res.locals.decoded;

  if (tipo_de_conta != "Anunciante") throw new AppError("Insufficient permission", 403);

  return next();
};