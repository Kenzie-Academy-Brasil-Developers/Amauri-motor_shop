import { z } from "zod";

const addressSchema = z.object({
  id: z.number().positive(),
  rua: z.string().max(150),
  cep: z.string().max(30),
  numero: z.string().max(7).nullish(),
  cidade: z.string().max(150),
  estado: z.string().max(2),
  complemento: z.string().max(30).nullish(),
});

const addressCreateSchema = addressSchema.omit({ id: true });
const addressUpdateSchema = addressCreateSchema.partial();

export { addressSchema, addressCreateSchema, addressUpdateSchema };
