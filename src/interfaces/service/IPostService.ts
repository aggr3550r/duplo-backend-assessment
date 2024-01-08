import {
  CreatePostDTO,
  FilterPostByCriteriaDTO,
  FindPostByCriteriaDTO,
  PostDTO,
  UpdatePostDTO,
} from '../../dtos/post.dto';
import { ResponseModel } from '../../models/response.model';
import { PageOptionsDTO } from '../../paging/page-option.dto';

export interface IPostService {
  createPost(
    authorId: string,
    input: CreatePostDTO
  ): Promise<ResponseModel<PostDTO>>;

  updatePost(
    criteria: FindPostByCriteriaDTO,
    input: UpdatePostDTO
  ): Promise<ResponseModel<PostDTO>>;

  deletePost(
    criteria: FilterPostByCriteriaDTO
  ): Promise<ResponseModel<PostDTO>>;

  getPostById(id: string): Promise<ResponseModel<PostDTO>>;

  getAllPosts(
    criteria: FilterPostByCriteriaDTO,
    queryOptions: PageOptionsDTO
  ): Promise<ResponseModel<PostDTO>>;
}
