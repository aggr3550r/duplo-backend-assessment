import { IMakeRepository } from './IMakeRepository';

export interface IRepositoryFactory {
  makeRepository(input: IMakeRepository): any;
}
