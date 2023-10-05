import { z } from "zod";
import { userCreateSchema, userUpdateSchema } from "./user.schema";
import {
  anouncementsCreateSchema,
  anouncementsUpdateSchema,
} from "./annoucements.schema";

const commentSchema = z.object({
  id: z.number().positive(),
  descricao: z.string().max(150),
  createdAt: z.string().or(z.date()),
});

const commentCreateSchema = commentSchema
  .omit({ id: true, createdAt: true })
  .extend({ user: userCreateSchema, anouncement: anouncementsCreateSchema });
const commentUpdateSchema = commentCreateSchema
  .omit({ user: true, anouncement: true })
  .extend({ user: userUpdateSchema, anouncement: anouncementsUpdateSchema })
  .partial();
const commentReturnSchema = commentSchema.extend({
  user: userCreateSchema,
  anouncement: anouncementsCreateSchema,
});
const commentReadSchema = commentReturnSchema.array();

export {
  commentSchema,
  commentCreateSchema,
  commentUpdateSchema,
  commentReadSchema,
  commentReturnSchema,
};
