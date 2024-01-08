import { Post, PrismaClient } from '@prisma/client';
import { IPostRepository } from '../../../interfaces/database/IPostRepository';
import { PageDTO } from '../../../paging/page.dto';
import { PageOptionsDTO } from '../../../paging/page-option.dto';
import { PageMetaDTO } from '../../../paging/page-meta.dto';

export class PostRepository implements IPostRepository<Post> {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
        isActive: true,
      },
    });

    return post;
  }

  async create(authorId: string, input: Partial<Post>): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        author: {
          connect: {
            id: authorId,
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
    return await this.prisma.post.update({
      where: {
        id: criteria.id,
        authorId: criteria?.authorId,
        isActive: true,
      },
      data,
    });
  }

  async delete(criteria: Partial<Post>): Promise<Post> {
    return await this.update(
      { id: criteria.id, authorId: criteria?.authorId },
      { isActive: false }
    );
  }

  async findByCriteria(criteria: Partial<Post>): Promise<Post> {
    const item = await this.prisma.post.findMany({
      where: {
        ...criteria,
        isActive: true,
      },
    });

    return item[0];
  }

  async findAll(
    criteria: Partial<Post>,
    queryOptions: PageOptionsDTO
  ): Promise<PageDTO<Post>> {
    const posts: Post[] = await this.prisma.post.findMany({
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
