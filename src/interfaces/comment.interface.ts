import { z } from "zod";
import Comment from "../entities/comments.entity";
import { DeepPartial, Repository } from "typeorm";
import { commentCreateSchema, commentReadSchema, commentReturnSchema } from "../schemas/comment.schema";



type commentCreate = z.infer<typeof commentCreateSchema>;
type commentReturn = z.infer<typeof commentReturnSchema>;
type commentRepo = Repository<Comment>;
type commentRead = z.infer<typeof commentReadSchema>;
type commentUpdate = DeepPartial<Comment>;


export { commentCreate, commentRepo, commentReturn, commentRead, commentUpdate };
