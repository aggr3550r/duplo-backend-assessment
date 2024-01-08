import {
  CreatePostDTO,
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

  deletePost(criteria: FindPostByCriteriaDTO): Promise<ResponseModel<PostDTO>>;

  getPostById(id: string): Promise<ResponseModel<PostDTO>>;

  getAllPosts(
    criteria: FindPostByCriteriaDTO,
    queryOptions: PageOptionsDTO
  ): Promise<ResponseModel<PostDTO>>;
}
