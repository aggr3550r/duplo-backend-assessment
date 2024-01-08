import { FastifyInstance } from 'fastify';
import SecurityUtil from '../utils/security.util';

import { HttpStatus } from '../enums/http-status.enum';
import { AppContext } from '../types';

async function authenticate(req: any, reply: any): Promise<void> {
  let ctx: AppContext;

  let token: unknown;
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith('Bearer')
  ) {
    token = req?.headers?.authorization.split(' ')[1];
  }
  if (!token) {
    reply.status(401).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'User not currently logged in!',
      data: null,
    });
    return;
  }

  console.info('MIDDLEWARE LOG', token);

  try {
    const payload: any = await SecurityUtil.verifyTokenWithSecret(
      token,
      process.env.JWT_SECRET
    );

    console.info('MIDDLEWARE LOG', payload);

    if (!payload.data) {
      reply.status(401).send({
        statusCode: 401,
        message:
          payload.message ||
          '[is-authenticated] You are not authorized to access this resource',
        data: null,
      });
      return;
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: payload.data['id'],
      },
    });

    if (!user) {
      reply.status(401).send({
        message:
          '[is-authenticated] You are not authorized to access this resource',
      });
      return;
    }

    req.auth = payload.data;
    req.user = payload.data;

    reply.continue;
  } catch (error) {
    console.error('Authentication error:', error);
    reply.status(500).send({
      message: 'Internal Server Error',
      data: null,
    });

    reply.contine;
  }
}

export default function (
  fastify: FastifyInstance,
  opts: any,
  done: () => void
): void {
  fastify.addHook('preHandler', authenticate);
  done();
}
