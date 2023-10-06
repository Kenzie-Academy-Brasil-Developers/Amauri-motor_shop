import { z } from "zod";
import { addressCreateSchema, addressUpdateSchema } from "./address.schema";
import { UserType } from "../entities/user.entity";

const userSchema = z.object({
  id: z.number().positive(),
  nome: z.string().max(50),
  email: z.string().max(50).email(),
  cpf: z.number().positive(),
  celular: z.string().max(30),
  data_de_nascimento: z.string().max(30),
  descricao: z.string().nullish(),
  tipo_de_conta: z.nativeEnum(UserType),
  password: z.string().max(200),
});

const userCreateSchema = userSchema
  .omit({
    id: true,
  })
  .extend({
    address: addressCreateSchema,
  });

const userReturnSchema = userSchema.omit({ password: true }).extend({address:addressCreateSchema});
const userUpdateSchema = userCreateSchema
  .omit({ tipo_de_conta: true, address: true })
  .extend({ address: addressUpdateSchema })
  .partial();

export { userSchema, userCreateSchema, userUpdateSchema, userReturnSchema };
