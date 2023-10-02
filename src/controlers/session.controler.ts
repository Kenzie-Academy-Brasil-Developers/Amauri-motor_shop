import { Request, Response } from "express";
import { SessionReturn } from "../interfaces/session.interface";
import { sessionService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token: SessionReturn= await sessionService.create(req.body);

  return res.status(200).json(token);
};

export default { create };
