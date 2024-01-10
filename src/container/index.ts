import { PostRepository } from '../modules/post/database/post.repository';
import { AppContext } from '../types';
import { UserRepository } from '../modules/user/data/user.repository';
import { UserService } from '../modules/user/user.service';
import { RepositoryFactory } from '../factories/repository.factory';
import { PostService } from '../modules/post/post.service';
import { UserController } from '../modules/user/user.controller';
import { ServiceFactory } from '../factories/service.factory';
import { PostController } from '../modules/post/post.controller';
import { ServiceType } from '../enums/service-type.enum';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const postRepository = new PostRepository(prisma);
const userRepository = new UserRepository(prisma);

const repositoryFactory = new RepositoryFactory(userRepository, postRepository);

const userService = new UserService(repositoryFactory, userRepository);
const postService = new PostService(repositoryFactory, postRepository);

const serviceFactory = new ServiceFactory(userService, postService);

export const userController = new UserController(
  serviceFactory,
  serviceFactory.makeService({ serviceType: ServiceType.USER_SERVICE })
);

export const postController = new PostController(
  serviceFactory,
  serviceFactory.makeService({ serviceType: ServiceType.POST_SERVICE })
);
