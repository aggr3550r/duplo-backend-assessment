import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';

export class RepositoryFactory implements IRepositoryFactory {
  makeRepository() {
    throw new Error('Method not implemented.');
  }
}
