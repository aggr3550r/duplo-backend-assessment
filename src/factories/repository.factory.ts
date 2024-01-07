import { RepositoryType } from '../enums/repository-type.enum';
import { IMakeRepository } from '../interfaces/factory/IMakeRepository';
import { IRepositoryFactory } from '../interfaces/factory/IRepositoryFactory';
import { PostRepository } from '../modules/post/database/post.repository';
import { UserRepository } from '../modules/user/data/user.repository';

export class RepositoryFactory implements IRepositoryFactory {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository
  ) {}
  public makeRepository(input: IMakeRepository) {
    return this.resolveRepositoryByName(input);
  }

  private resolveRepositoryByName(input: IMakeRepository) {
    let repository: any;

    switch (input?.repositoryType) {
      case RepositoryType.USER:
        repository = this.userRepository;
        break;

      case RepositoryType.POST:
        repository = this.postRepository;

      default:
        throw new Error('Could not find repsitory.');
        break;
    }

    return repository;
  }
}
