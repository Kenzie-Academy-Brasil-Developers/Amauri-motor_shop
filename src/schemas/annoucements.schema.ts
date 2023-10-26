import { z } from "zod";
import { imagesCreateSchema, imagesUpdateSchema } from "./images.schema";

const anouncementsSchema = z.object({
  id: z.number().positive(),
  marca: z.string().max(100),
  modelo: z.string().max(100),
  ano: z.string().max(2000),
  combustivel: z.string().max(200),
  quilometragem: z.string().max(2000),
  cor: z.string().max(150),
  valor_tabela_fip: z.string(),
  valor: z.string().max(2000),
  descricao: z.string().max(2000),
  img_capa: z.string().max(2000),
  is_active:z.string().default("ativo"),

  

});

const anouncementsCreateSchema=anouncementsSchema.omit({id:true}).extend({images:imagesCreateSchema})
const anouncementsUpdateSchema=anouncementsCreateSchema.omit({images:true}).extend({images:imagesUpdateSchema}).partial()
const anouncementsReturnSchema=anouncementsCreateSchema.omit({images:true}).extend({images:imagesCreateSchema})
const anouncementsReadSchema= anouncementsReturnSchema.array()

export{
    anouncementsCreateSchema,
    anouncementsReadSchema,
    anouncementsReturnSchema,
    anouncementsSchema,
    anouncementsUpdateSchema
}
