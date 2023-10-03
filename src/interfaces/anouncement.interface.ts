import { z } from "zod";
import { anouncementsCreateSchema, anouncementsReadSchema, anouncementsReturnSchema } from "../schemas/annoucements.schema";
import { DeepPartial, Repository } from "typeorm";
import Anouncement from "../entities/anouncements.entity";


type anouncementCreate = z.infer<typeof anouncementsCreateSchema>;
type anouncementReturn = z.infer<typeof anouncementsReturnSchema>;
type anouncementRepo = Repository<Anouncement>;
type anouncementRead = z.infer<typeof anouncementsReadSchema>;
type anouncementUpdate = DeepPartial<Anouncement>;


export { anouncementCreate, anouncementRepo, anouncementReturn, anouncementRead, anouncementUpdate };
