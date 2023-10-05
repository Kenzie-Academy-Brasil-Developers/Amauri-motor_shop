import { AppDataSource } from "../data-source";
import Address from "../entities/address.entity";
import User from "../entities/user.entity";
import { addressRepo } from "../interfaces/address.interface";
import { UserCreate, UserRepo, UserReturn, UserUpdate } from "../interfaces/user.interface";
import { userReturnSchema } from "../schemas/user.schema";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const addressRepository: addressRepo = AppDataSource.getRepository(Address);
  const address: Address= addressRepository.create(payload.address);

  await addressRepository.save(address);

  const user:User = userRepository.create({ 
  ...payload,

    address: address
   });

  await userRepository.save(user);

  return userReturnSchema.parse(user);
};

const update = async (user: User, payload: UserUpdate): Promise<UserReturn> => {
  const repo: UserRepo = AppDataSource.getRepository(User);

  const addressRepository: addressRepo = AppDataSource.getRepository(Address);

  const addressUpd: Address = addressRepository.create({
    ...user.address,
    ...payload.address,
  });
  await addressRepository.save(addressUpd);
  const userUpd: User = repo.create({
    ...user,
    ...payload,
    address: addressUpd,
  });

  const userAtualizado = await repo.save(userUpd);

  return userReturnSchema.parse(userAtualizado);
};

const destroy = async (user: User): Promise<void> => {
  const repo: UserRepo = AppDataSource.getRepository(User);

  await repo.remove(user);
};

export default { create, update, destroy };
