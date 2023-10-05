import { Request, Response } from "express";
import {
  anouncementRead,
  anouncementReturn,
  anouncementUpdate,
} from "../interfaces/anouncement.interface";
import { anouncementsService } from "../services";
import Anouncement from "../entities/anouncements.entity";

const create = async (req: Request, res: Response): Promise<Response> => {
  const anouncement = await anouncementsService.create(
    req.body,
    res.locals.foundEntity
  );
  return res.status(201).json(anouncement);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const anouncements: Anouncement[] = await anouncementsService.read();
  return res.status(200).json(anouncements);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const anouncement: anouncementReturn = await res.locals.foundAnouncement;
  return res.status(200).json(anouncement);
};
const update = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);

  const anouncement = await anouncementsService.update(
    res.locals.foundAnouncement,
    req.body,
    userId
  );
  return res.status(200).json(anouncement);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(res.locals.decoded.sub);

  await anouncementsService.destroy(res.locals.foundAnouncement, userId);
  return res.status(204).json();
};

export default { create, read, retrieve, destroy, update };
