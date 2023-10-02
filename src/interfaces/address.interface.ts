import {z} from"zod"
import { Repository } from "typeorm";
import  Address  from "../entities/address.entity";
import { addressCreateSchema } from "../schemas/address.schema";

type addressRepo = Repository<Address>;
type addressCreate=z.infer<typeof addressCreateSchema>
export { addressRepo,addressCreate };