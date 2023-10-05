import { z } from "zod";
import { imagesCreateSchema } from "../schemas/images.schema";
import Image from "../entities/images.entity";
import { Repository } from "typeorm";

type imageRepo = Repository<Image>;
type imageCreate = z.infer<typeof imagesCreateSchema>;

export { imageRepo, imageCreate };
