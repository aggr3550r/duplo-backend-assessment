import { FastifyReply, FastifyRequest } from 'fastify';
import { ServiceType } from '../../enums/service-type.enum';
import { ServiceFactory } from '../../factories/service.factory';
import { IMakeService } from '../../interfaces/factory/IMakeService';
import { IUserService } from '../../interfaces/service/IUserService';
import { PageOptionsDTO } from '../../paging/page-option.dto';
import { CreateUserDTO, FindUserByCriteriaDTO } from '../../dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { FindByIdDTO } from '../../dtos/common.dto';

export class UserController {
  constructor(
    private readonly serviceFactory: ServiceFactory,
    private readonly userService: IUserService
  ) {
    this.userService = this.serviceFactory.makeService({
      serviceType: ServiceType.USER_SERVICE,
    } as IMakeService);
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as CreateUserDTO;
      const input = plainToClass(CreateUserDTO, body);

      await validateOrReject(input);

      const serviceResponse = await this.userService.createUser(input);

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramObj = plainToClass(FindByIdDTO, request.params);
      await validateOrReject(paramObj);

      const { id: userId } = paramObj;

      const serviceResponse = await this.userService.getUserById(userId);

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const queryParams = request.query as FindUserByCriteriaDTO &
        PageOptionsDTO;
      const criteria: FindUserByCriteriaDTO = plainToClass(
        FindUserByCriteriaDTO,
        {
          id: queryParams?.id,
          firstName: queryParams?.firstName,
          lastName: queryParams?.lastName,
          isActive: queryParams?.isActive,
          email: queryParams?.email,
        } as FindUserByCriteriaDTO
      );
      const queryOptions: PageOptionsDTO = plainToClass(PageOptionsDTO, {
        ...queryParams,
        skip: queryParams?.skip,
      });

      await validateOrReject(criteria);
      await validateOrReject(queryOptions);

      const serviceResponse = await this.userService.getAllUsers(
        criteria,
        queryOptions
      );

      reply.code(serviceResponse.statusCode).send(serviceResponse);
    } catch (error) {
      reply.code(500).send({ error });
    }
  }
}
