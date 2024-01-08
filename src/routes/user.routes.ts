import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { userController } from '../container';

async function userRoutes(fastify: FastifyInstance) {
  const apiVersion = '/v1';

  fastify.post(
    `${apiVersion}/users`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await userController.createUser(request, reply);
    }
  );

  fastify.get(
    `${apiVersion}/users`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await userController.getAllUsers(request, reply);
    }
  );

  fastify.get(
    `${apiVersion}/users/:id`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await userController.getUserById(request, reply);
    }
  );
}

export default userRoutes;
