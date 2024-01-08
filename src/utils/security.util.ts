import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import * as JWT from 'jsonwebtoken';
import { User } from '@prisma/client';
import { configService } from '../config/config.service';

const scrypt = promisify(_scrypt);

export default class SecurityUtil {
  static async generateTokenWithSecret(user: User): Promise<string> {
    const { id, email } = user;
    return JWT.sign({ id, email }, configService.getValue('JWT_SECRET'), {
      expiresIn: configService.getValue('JWT_EXPIRES_IN'),
    });
  }

  static async verifyTokenWithSecret(token: any, secretKey: string) {
    try {
      const decoded = JWT.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error('verifyTokenWithSecret error()');
      throw new Error(error.message.toString().toLocaleUpperCase());
    }
  }

  static async encryptPassword(password: string) {
    try {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const encryptedPassword = salt.concat('.', hash.toString('hex'));

      return encryptedPassword;
    } catch (error) {
      console.log('An error occured while encrypting this password.');
      console.log(error);
    }
  }

  static async decryptAndVerifyPassword(clientPassword: string, user: User) {
    try {
      const userPassword = user?.password;

      if (!userPassword)
        throw new Error('Could not find password for that user');

      const [salt, storedHash] = userPassword.split('.');

      const hash = (await scrypt(clientPassword, salt, 32)) as Buffer;

      if (storedHash === hash.toString('hex')) {
        return user;
      } else {
        throw new Error('Password Incorrect');
      }
    } catch (error) {
      console.error('decryptAndVerifyPassword() error \n %o', error);

      throw new Error(
        error?.message || 'Error occured while trying to verify that password'
      );
    }
  }
}
