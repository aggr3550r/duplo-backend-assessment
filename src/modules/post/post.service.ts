import { Post } from '@prisma/client';
import { RepositoryFactory } from '../../factories/repository.factory';
import { IPostRepository } from '../../interfaces/database/IPostRepository';
import { IPostService } from '../../interfaces/service/IPostService';
import { RepositoryType } from '../../enums/repository-type.enum';
import { IMakeRepository } from '../../interfaces/factory/IMakeRepository';
import { ResponseModel } from '../../models/response.model';
import { HttpStatus } from '../../enums/http-status.enum';
import {
  CreatePostDTO,
  FilterPostByCriteriaDTO,
  FindPostByCriteriaDTO,
  UpdatePostDTO,
} from '../../dtos/post.dto';
import { PageOptionsDTO } from '../../paging/page-option.dto';

export class PostService implements IPostService {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly postRepository: IPostRepository<Post>
  ) {
    this.postRepository = this.repositoryFactory.makeRepository({
      repositoryType: RepositoryType.POST,
    } as IMakeRepository);
  }

  async createPost(authorId: string, input: CreatePostDTO) {
    try {
      const postExists = await this.postRepository.findByCriteria({
        title: input.title,
      });

      if (postExists) {
        throw new Error('Post with that title already exists.');
      }

      const response = await this.postRepository.create(authorId, input);

      return new ResponseModel(
        HttpStatus.CREATED,
        'Successfully created post.',
        response
      );
    } catch (error) {
      console.error('createPost() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while creating post.',
        null
      );
    }
  }

  async updatePost(criteria: FindPostByCriteriaDTO, input: UpdatePostDTO) {
    try {
      const postExists = await this.postRepository.findByCriteria(criteria);

      if (!postExists) {
        throw new Error('Post does not exist.');
      }
      const response = await this.postRepository.update(criteria, input);

      return new ResponseModel(
        HttpStatus.OK,
        'Successfuly updated post.',
        response
      );
    } catch (error) {
      console.error('updatePost() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while updating post.',
        null
      );
    }
  }

  async deletePost(criteria: FilterPostByCriteriaDTO) {
    try {
      const postExists = await this.postRepository.findByCriteria(criteria);

      if (!postExists) {
        throw new Error('Post not found.');
      }

      const updateResponse = await this.postRepository.delete(criteria);

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully deleted post.',
        updateResponse
      );
    } catch (error) {
      console.error('deletePost() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while deleting post.',
        null
      );
    }
  }

  async getPostById(id: string) {
    try {
      const postExists = await this.postRepository.findById(id);

      if (!postExists) {
        throw new Error('Post not found.');
      }

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved post.',
        postExists
      );
    } catch (error) {
      console.error('getPostById() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while retrieving post.',
        null
      );
    }
  }

  async getAllPosts(
    criteria: FindPostByCriteriaDTO,
    queryOptions: PageOptionsDTO
  ) {
    try {
      const posts = await this.postRepository.findAll(criteria, queryOptions);

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved posts.',
        posts
      );
    } catch (error) {
      console.error('getAllPosts() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while retrieving all posts.',
        null
      );
    }
  }
}
