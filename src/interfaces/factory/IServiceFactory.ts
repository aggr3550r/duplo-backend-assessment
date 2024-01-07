import { IMakeService } from './IMakeService';

export interface IServiceFactory {
  makeService(input: IMakeService): any;
}
