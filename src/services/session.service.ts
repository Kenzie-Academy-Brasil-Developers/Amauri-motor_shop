import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { UserRepo } from "../interfaces/user.interface";

import { sign } from "jsonwebtoken";
import User from "../entities/user.entity";
import { SessionCreate, SessionReturn } from "../interfaces/session.interface";
import { AppError } from "../errors/app.error";
import { sessionCreateSchema } from "../schemas/session.schema";

const create = async (payload: SessionCreate): Promise<SessionReturn> => {
  const validate = sessionCreateSchema.parse(payload);

  const { email } = validate;

  const repo: UserRepo = AppDataSource.getRepository(User);
  const user: User | null = await repo.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  
  const samePassword: boolean = await compare(payload.password, user.password);

  if (!samePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { email: user.email, name: user.nome, tipo_de_conta:user.tipo_de_conta},
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { create };
