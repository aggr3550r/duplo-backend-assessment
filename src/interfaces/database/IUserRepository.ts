import { CreateUserDTO } from '../../dtos/user.dto';
import { IGenericRepository } from './IGenericRepository';

export interface IUserRepository<T> extends IGenericRepository<T> {
  create(input: CreateUserDTO): Promise<T>;
}
