import { z } from "zod";

const imagesSchema = z.object({
  id: z.number().positive(),
  img_url: z.string().max(2000),

})

const imagesCreateSchema=imagesSchema.omit({id:true})
const imagesUpdateSchema=imagesCreateSchema.partial()

export { imagesSchema,imagesCreateSchema,imagesUpdateSchema };