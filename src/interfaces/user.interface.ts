import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { userCreateSchema, userReturnSchema } from "../schemas/user.schema";
import User from "../entities/user.entity";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserUpdate = DeepPartial<User>;

type UserRepo = Repository<User>;

export { UserCreate, UserReturn, UserUpdate, UserRepo };
