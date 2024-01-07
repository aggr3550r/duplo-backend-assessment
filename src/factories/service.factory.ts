import { ServiceType } from '../enums/service-type.enum';
import { IMakeService } from '../interfaces/factory/IMakeService';
import { IServiceFactory } from '../interfaces/factory/IServiceFactory';
import { PostService } from '../modules/post/post.service';
import { UserService } from '../modules/user/user.service';

export class ServiceFactory implements IServiceFactory {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  public makeService(input: IMakeService) {
    return this.resolveServiceByType(input);
  }

  private resolveServiceByType(input: IMakeService) {
    let service: any;
    switch (input?.serviceType) {
      case ServiceType.USER_SERVICE:
        service = this.userService;
        break;

      case ServiceType.POST_SERVICE:
        service = this.postService;
        break;

      default:
        throw new Error('Could not find service.');
        break;
    }
    return service;
  }
}
