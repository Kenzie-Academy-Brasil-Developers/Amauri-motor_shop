import { AppDataSource } from "../data-source";
import Anouncement from "../entities/anouncements.entity";
import Image from "../entities/images.entity";
import User from "../entities/user.entity";
import { AppError } from "../errors/app.error";
import {
  anouncementRepo,
} from "../interfaces/anouncement.interface";
import { imageRepo } from "../interfaces/images.interface";
import { anouncementsReturnSchema } from "../schemas/annoucements.schema";

const create = async (payload: any, user: User) => {
    if(user.tipo_de_conta!="Anunciante")throw new AppError("Insufficient permission", 403)
  
    const anouncementRepository: anouncementRepo =
    AppDataSource.getRepository(Anouncement);

  const newAnnouncement = anouncementRepository.create({
    marca: payload.marca,
    modelo: payload.modelo,
    ano: payload.ano,
    combustivel: payload.combustivel,
    cor: payload.cor,
    quilometragem: payload.quilometragem,
    valor_tabela_fip: payload.valor_tabela_fip,
    valor: payload.valor,
    descricao: payload.descricao,
    img_capa: payload.img_capa,

    user: user,
  });

  await anouncementRepository.save(newAnnouncement);

  const imageRepository: imageRepo = AppDataSource.getRepository(Image);
  console.log(newAnnouncement);
  for await (let i of payload.images) {
    const images = imageRepository.create({
      ...i,
      anouncement: newAnnouncement,
    });
    console.log(i);
    await imageRepository.save(images);
  }

  const returnAnounciments = anouncementRepository.findOne({
    where: { id: newAnnouncement.id },
    relations: {
      images: true,
    },
  });

  return returnAnounciments;
};

export default { create };
