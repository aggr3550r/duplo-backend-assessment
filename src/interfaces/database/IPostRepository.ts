import { IGenericRepository } from './IGenericRepository';

export interface IPostRepository<T> extends IGenericRepository<T> {
  create(authorId: string, data: Partial<T>): Promise<T>;
}
