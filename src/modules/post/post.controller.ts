import { FastifyReply, FastifyRequest } from 'fastify';
import { ServiceType } from '../../enums/service-type.enum';
import { ServiceFactory } from '../../factories/service.factory';
import { IMakeService } from '../../interfaces/factory/IMakeService';
import {
  CreatePostDTO,
  FilterPostByCriteriaDTO,
  FindPostByCriteriaDTO,
  UpdatePostDTO,
} from '../../dtos/post.dto';
import { PageOptionsDTO } from '../../paging/page-option.dto';
import { IPostService } from '../../interfaces/service/IPostService';
import { validateOrReject } from 'class-validator';
import { FindByIdDTO } from '../../dtos/common.dto';
import { plainToClass } from 'class-transformer';

export class PostController {
  constructor(
    private readonly serviceFactory: ServiceFactory,
    private readonly postService: IPostService
  ) {
    this.postService = this.serviceFactory.makeService({
      serviceType: ServiceType.POST_SERVICE,
    } as IMakeService);
  }

  async createPost(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as CreatePostDTO;
      const input = plainToClass(CreatePostDTO, body);

      const paramObj = request.params as FindByIdDTO;

      await validateOrReject(input);
      await validateOrReject(paramObj);

      const { id: authorId } = paramObj;

      const serviceResponse = await this.postService.createPost(
        authorId,
        input
      );

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
      const queryParams = request.query as FilterPostByCriteriaDTO &
        PageOptionsDTO;

      const criteria: FilterPostByCriteriaDTO = plainToClass(
        FilterPostByCriteriaDTO,
        {
          id: queryParams?.id,
          authorId: queryParams?.authorId,
        } as FilterPostByCriteriaDTO
      );

      const queryOptions: PageOptionsDTO = plainToClass(PageOptionsDTO, {
        ...queryParams,
        skip: queryParams?.skip,
      });

      await validateOrReject(criteria);
      await validateOrReject(queryOptions);

      const serviceResponse = await this.postService.getAllPosts(
        criteria,
        queryOptions
      );

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async getPostById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramObj = plainToClass(FindByIdDTO, request.params);
      await validateOrReject(paramObj);

      const { id: postId } = paramObj;

      const serviceResponse = await this.postService.getPostById(postId);

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async deletePost(request: FastifyRequest, reply: FastifyReply) {
    try {
      const queryParams = request.query as FilterPostByCriteriaDTO;

      const criteria: FilterPostByCriteriaDTO = plainToClass(
        FilterPostByCriteriaDTO,
        { ...queryParams }
      );

      await validateOrReject(criteria);

      const serviceResponse = await this.postService.deletePost(criteria);

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async updatePost(request: FastifyRequest, reply: FastifyReply) {
    try {
      const queryParams = request.query as FindPostByCriteriaDTO;
      const body = request.body as UpdatePostDTO;

      const criteria: FindPostByCriteriaDTO = plainToClass(
        FindPostByCriteriaDTO,
        { ...queryParams }
      );

      const input: UpdatePostDTO = plainToClass(UpdatePostDTO, { ...body });

      await validateOrReject(criteria);
      await validateOrReject(input);

      const serviceResponse = await this.postService.updatePost(
        criteria,
        input
      );

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error });
    }
  }
}
