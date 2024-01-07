import { IGenericRepository } from './IGenericRepository';

export interface IPostRepository<T> extends IGenericRepository<T> {
  create(data: Partial<T>): Promise<T>;
}
