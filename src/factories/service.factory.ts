import { IServiceFactory } from '../interfaces/factory/IServiceFactory';

export class ServiceFactory implements IServiceFactory {
  makeService() {
    throw new Error('Method not implemented.');
  }
}
