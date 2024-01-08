import { User } from '@prisma/client';
import { RepositoryFactory } from '../../factories/repository.factory';
import { IUserRepository } from '../../interfaces/database/IUserRepository';
import { IUserService } from '../../interfaces/service/IUserService';
import { RepositoryType } from '../../enums/repository-type.enum';
import { IMakeRepository } from '../../interfaces/factory/IMakeRepository';
import {
  CreateUserDTO,
  FindUserByCriteriaDTO,
  UpdateUserDTO,
} from '../../dtos/user.dto';
import { ResponseModel } from '../../models/response.model';
import { HttpStatus } from '../../enums/http-status.enum';
import { PageOptionsDTO } from '../../paging/page-option.dto';

export class UserService implements IUserService {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly userRepository: IUserRepository<User>
  ) {
    this.userRepository = this.repositoryFactory.makeRepository({
      repositoryType: RepositoryType.USER,
    } as IMakeRepository);
  }

  public async createUser(input: CreateUserDTO) {
    try {
      const userExists = await this.userRepository.findByCriteria({
        email: input?.email,
      });

      if (userExists) {
        throw new Error('User with that email already exists.');
      }
      const user = await this.userRepository.create(input);

      return new ResponseModel(
        HttpStatus.CREATED,
        'Successfully created user.',
        user
      );
    } catch (error) {
      console.error('createUser() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while creating user.',
        null
      );
    }
  }

  public async updateUser(
    criteria: FindUserByCriteriaDTO,
    input: UpdateUserDTO
  ) {
    try {
      const response = await this.userRepository.update({ ...criteria }, input);

      return new ResponseModel(
        HttpStatus.OK,
        'Successully updated user.',
        response
      );
    } catch (error) {
      console.error('updateUser() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while updating user.',
        null
      );
    }
  }

  public async getUserById(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new Error('Could not find user by id.');
      }

      return new ResponseModel(HttpStatus.OK, 'Get user by id.', user);
    } catch (error) {
      console.error('getUserById() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while getting user.',
        null
      );
    }
  }

  public async getUserByCriteria(criteria: FindUserByCriteriaDTO) {
    try {
      const user = await this.userRepository.findByCriteria(criteria);

      if (!user) {
        throw new Error('Could not find user.');
      }

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved user.',
        user
      );
    } catch (error) {
      console.error('getUserByCritera() error \n %o', error);

      return new ResponseModel(
        HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while getting user.',
        null
      );
    }
  }

  public async getAllUsers(
    criteria: FindUserByCriteriaDTO,
    queryOptions: PageOptionsDTO
  ) {
    try {
      const users = await this.userRepository.findAll(criteria, queryOptions);

      return new ResponseModel(
        HttpStatus.OK,
        'Successfully retrieved users.',
        users
      );
    } catch (error) {
      console.error('getAllUsers() error \n %o', error);

      return new ResponseModel(
        error?.status || HttpStatus.BAD_REQUEST,
        error?.message || 'An error occurred while getting user.',
        null
      );
    }
  }
}
