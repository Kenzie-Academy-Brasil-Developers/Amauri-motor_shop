import { Request, Response } from "express";
import { anouncementReturn } from "../interfaces/anouncement.interface";
import { anouncementsService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const anouncement = await anouncementsService.create(req.body,res.locals.foundEntity,
      );
    return res.status(201).json(anouncement);
  };

  export default{create}