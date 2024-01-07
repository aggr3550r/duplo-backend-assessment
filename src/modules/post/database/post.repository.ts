import { Post } from '@prisma/client';
import { IPostRepository } from '../../../interfaces/database/IPostRepository';
import { AppContext } from '../../../types';
import { PageDTO } from '../../../paging/page.dto';
import { PageOptionsDTO } from '../../../paging/page-option.dto';
import { PageMetaDTO } from '../../../paging/page-meta.dto';

export class PostRepository implements IPostRepository<Post> {
  constructor(private ctx: AppContext) {}

  async findById(id: string): Promise<Post> {
    const post = await this.ctx.prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async create(input: Partial<Post>): Promise<Post> {
    const post = await this.ctx.prisma.post.create({
      data: {
        author: {
          connect: {
            id: input.authorId,
          },
        },
        content: input.content,
        description: input?.description,
        title: input.title,
      },
    });

    return post;
  }
  async update(criteria: Partial<Post>, data: Partial<Post>): Promise<Post> {
    return await this.ctx.prisma.post.update({
      where: {
        id: criteria?.id,
        authorId: criteria?.authorId,
      },
      data,
    });
  }

  async delete(criteria: Partial<Post>): Promise<Post> {
    return await this.update(
      { id: criteria?.id, authorId: criteria?.authorId },
      { isActive: false }
    );
  }

  async findByCriteria(criteria: Partial<Post>): Promise<Post> {
    const item = await this.ctx.prisma.post.findMany({
      where: {
        ...criteria,
      },
    });

    return item[0];
  }

  async findAll(
    criteria: Partial<Post>,
    queryOptions: PageOptionsDTO
  ): Promise<PageDTO<Post>> {
    const posts: Post[] = await this.ctx.prisma.post.findMany({
      where: {
        authorId: criteria?.authorId,
        ...criteria,
        isActive: true,
      },
      skip: queryOptions?.skip,
      take: queryOptions?.take,
    });

    const pageMetaDTO: PageMetaDTO = new PageMetaDTO({
      page_options_dto: queryOptions,
      total_items: posts.length,
    });

    return new PageDTO(posts, pageMetaDTO);
  }
}
