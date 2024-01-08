import {
  CreateUserDTO,
  FindUserByCriteriaDTO,
  UpdateUserDTO,
  UserDTO,
} from '../../dtos/user.dto';
import { ResponseModel } from '../../models/response.model';
import { PageOptionsDTO } from '../../paging/page-option.dto';
import { PageDTO } from '../../paging/page.dto';

export interface IUserService {
  createUser(input: CreateUserDTO): Promise<ResponseModel<UserDTO>>;
  updateUser(
    criteria: FindUserByCriteriaDTO,
    input: UpdateUserDTO
  ): Promise<ResponseModel<UserDTO>>;
  getUserById(id: string): Promise<ResponseModel<UserDTO>>;
  getUserByCriteria(
    criteria: FindUserByCriteriaDTO
  ): Promise<ResponseModel<UserDTO>>;
  getAllUsers(
    criteria: FindUserByCriteriaDTO,
    queryOptions: PageOptionsDTO
  ): Promise<ResponseModel<PageDTO<UserDTO>>>;
}
