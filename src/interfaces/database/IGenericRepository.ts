import { PageOptionsDTO } from '../../paging/page-option.dto';
import { PageDTO } from '../../paging/page.dto';

export interface IGenericRepository<T> {
  findById(id: string, withFields?: boolean): Promise<T>;
  update(criteria: Partial<T>, data: Partial<T>): Promise<any>;
  delete(criteria: Partial<T>): Promise<T>;
  findByCriteria(criteria: Partial<T>): Promise<T>;
  findAll(
    criteria: Partial<T>,
    queryOptions: PageOptionsDTO
  ): Promise<PageDTO<T>>;
}
