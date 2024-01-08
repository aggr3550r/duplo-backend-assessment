import { LoginDTO, SignUpDTO } from '../../dtos/auth.dto';
import { ServiceType } from '../../enums/service-type.enum';
import { ServiceFactory } from '../../factories/service.factory';
import { IMakeService } from '../../interfaces/factory/IMakeService';
import { IUserService } from '../../interfaces/service/IUserService';
import SecurityUtil from '../../utils/security.util';

export class AuthService {
  constructor(
    private readonly serviceFactory: ServiceFactory,
    private readonly userService: IUserService
  ) {
    this.userService = this.serviceFactory.makeService({
      serviceType: ServiceType.USER_SERVICE,
    } as IMakeService);
  }

  async signup(input: SignUpDTO) {
    try {
      let { password } = input;

      const encryptedPassword = await SecurityUtil.encryptPassword(password);
      Object.assign(input, { password: encryptedPassword });

      return await this.userService.createUser(input);
    } catch (error) {
      console.error('signup() error', error);
      throw new Error(error?.message || 'Could not complete user signup.');
    }
  }

  async login(data: LoginDTO) {
    try {
      const user = (
        await this.userService.getUserByCriteria({
          email: data?.email,
        })
      ).data;

      if (!user) {
        throw new Error('Could not find user with that email.');
      }

      const verificationResult = await SecurityUtil.decryptAndVerifyPassword(
        data.password,
        user
      );

      return verificationResult;
    } catch (error) {
      console.error('login() error', error);
      throw new Error(error?.message || 'Could not complete user login.');
    }
  }
}
