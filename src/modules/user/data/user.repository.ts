import { AppContext } from '../../../types';
import { PageDTO } from '../../../paging/page.dto';
import { PageOptionsDTO } from '../../../paging/page-option.dto';
import { PageMetaDTO } from '../../../paging/page-meta.dto';
import { IUserRepository } from '../../../interfaces/database/IUserRepository';
import { Prisma, User } from '@prisma/client';
import { CONTEXT } from '../../../server';

export class UserRepository implements IUserRepository<User> {
  constructor(private ctx: AppContext) {
    this.ctx = CONTEXT;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ctx.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(input: Prisma.UserCreateInput): Promise<User> {
    const user = await this.ctx.prisma.user.create({
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: input.password,
      },
    });

    return user;
  }

  async update(criteria: Partial<User>, data: Partial<User>): Promise<User> {
    const userExists = await this.findByCriteria(criteria);

    if (!userExists) {
      throw new Error('Could not find user.');
    }

    return await this.ctx.prisma.user.update({
      where: {
        id: criteria?.id,
        ...criteria,
      },
      data,
    });
  }

  async delete(criteria: Partial<User>): Promise<User> {
    return await this.update({ ...criteria }, { isActive: false });
  }

  async findByCriteria(criteria: Partial<User>): Promise<User> {
    const item = await this.ctx.prisma.user.findMany({
      where: {
        ...criteria,
      },
    });

    return item[0];
  }

  async findAll(
    criteria: Partial<User>,
    queryOptions: PageOptionsDTO
  ): Promise<PageDTO<User>> {
    const users: User[] = await this.ctx.prisma.user.findMany({
      where: {
        ...criteria,
        isActive: true,
      },
      skip: queryOptions?.skip,
      take: queryOptions?.take,
    });

    const pageMetaDTO: PageMetaDTO = new PageMetaDTO({
      page_options_dto: queryOptions,
      total_items: users.length,
    });

    return new PageDTO(users, pageMetaDTO);
  }
}
