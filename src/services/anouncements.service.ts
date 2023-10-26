import { AppDataSource } from "../data-source";
import Anouncement from "../entities/anouncements.entity";
import Image from "../entities/images.entity";
import User from "../entities/user.entity";
import { AppError } from "../errors/app.error";
import {
  anouncementCreate,
  anouncementRead,
  anouncementRepo,
  anouncementReturn,
  anouncementUpdate,
} from "../interfaces/anouncement.interface";
import { imageRepo } from "../interfaces/images.interface";

const create = async (payload: any, user: User) => {
  if (user.tipo_de_conta != "Anunciante")
    throw new AppError("Not Anunciante!", 403);

  const anouncementRepository: anouncementRepo =
    AppDataSource.getRepository(Anouncement);

  const newAnnouncement: Anouncement = anouncementRepository.create({
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
  for await (let i of payload.images) {
    const images = imageRepository.create({
      ...i,
      anouncement: newAnnouncement,
    });
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

const read = async (): Promise<Anouncement[]> => {
  const anouncimentRepository: anouncementRepo =
    AppDataSource.getRepository(Anouncement);

  const reads = await anouncimentRepository.find({
    relations: {
      images: true,
      user: { anouncements: true },
      comments: { user: true },
    },
  });

  return reads;
};

const update = async (
  anouncement: Anouncement,
  payload: any,
  userId: number
) => {
  const repo: anouncementRepo = AppDataSource.getRepository(Anouncement);
  if (userId == anouncement.user.id) {
    const imageRepository: imageRepo = AppDataSource.getRepository(Image);
    const anouncementUpd: any = repo.create({
      ...anouncement,
      ...payload,
    });

    const anouncementAtualizado: Anouncement = await repo.save(anouncementUpd)!;
    for await (let i of payload.imagens) {
      const updImage = anouncementAtualizado.images.find(
        (image: any) => image.img_url === i.img_url
      );
      if (!updImage) {
        const images = imageRepository.create({
          ...i,

          anouncement: anouncementAtualizado,
        });
        await imageRepository.save(images);
      }
    }

    const returnAnounciments = repo.findOne({
      where: { id: anouncementAtualizado.id },
      relations: {
        images: true,
      },
    });

    return returnAnounciments;
  }
  throw new AppError("Insufficient permission", 403);
};

const destroy = async (
  anouncement: Anouncement,
  userId: number
): Promise<void> => {
  if (userId == anouncement.user.id) {
    const repo: anouncementRepo = AppDataSource.getRepository(Anouncement);
    await repo.remove(anouncement);
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};

export default { create, read, destroy, update };
