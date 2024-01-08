import { plainToClass } from 'class-transformer';
import { LoginDTO, SignUpDTO } from '../../dtos/auth.dto';
import { IAuthService } from '../../interfaces/service/IAuthService';
import { validateOrReject } from 'class-validator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServiceFactory } from '../../factories/service.factory';
import { ServiceType } from '../../enums/service-type.enum';
import { IMakeService } from '../../interfaces/factory/IMakeService';

export default class AuthController {
  constructor(
    private authService: IAuthService,
    private readonly serviceFactory: ServiceFactory
  ) {
    this.authService = this.serviceFactory.makeService({
      serviceType: ServiceType.AUTH_SERVICE,
    } as IMakeService);
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as LoginDTO;
      const input = plainToClass(LoginDTO, body);

      await validateOrReject(input);

      const serviceResponse = await this.authService.login(input);

      if (serviceResponse) {
        await this.authService.createAndSendAuthToken(
          serviceResponse?.data,
          reply
        );
      }
    } catch (error) {
      reply
        .code(500)
        .send({ error: `Internal server error - ${error?.message}` });
    }
  }

  async signup(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as SignUpDTO;
      const input = plainToClass(SignUpDTO, body);

      await validateOrReject(input);

      const serviceResponse = await this.authService.signUp(input);

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply
        .code(500)
        .send({ error: `Internal server error - ${error?.message}` });
    }
  }
}
