import { CreateUserDTO } from './user.dto';

export class LoginDTO {
  email: string;
  password: string;
}

export class SignUpDTO extends CreateUserDTO {}
