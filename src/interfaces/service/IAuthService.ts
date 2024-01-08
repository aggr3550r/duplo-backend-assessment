import { FastifyReply } from 'fastify';
import { LoginDTO, SignUpDTO } from '../../dtos/auth.dto';
import { UserDTO } from '../../dtos/user.dto';
import { ResponseModel } from '../../models/response.model';

export interface IAuthService {
  login(input: LoginDTO): Promise<ResponseModel<any>>;
  signUp(input: SignUpDTO): Promise<ResponseModel<UserDTO>>;
  createAndSendAuthToken(user: UserDTO, reply: FastifyReply): any;
}
