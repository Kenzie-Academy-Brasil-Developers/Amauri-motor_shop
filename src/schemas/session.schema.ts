import { z } from "zod";

const sessionCreateSchema = z.object({
  email: z.string().max(50).email(),
  password: z.string().max(200),
});

export { sessionCreateSchema };
