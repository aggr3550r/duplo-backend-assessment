import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { postController } from '../container';

async function postRoutes(fastify: FastifyInstance) {
  const apiVersion = '/v1';

  fastify.post(
    `${apiVersion}/posts`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await postController.createPost(request, reply);
    }
  );

  fastify.patch(
    `${apiVersion}/posts/:id`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await postController.updatePost(request, reply);
    }
  );

  fastify.get(
    `${apiVersion}/posts`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await postController.getAllPosts(request, reply);
    }
  );

  fastify.get(
    `${apiVersion}/posts/:id`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await postController.getPostById(request, reply);
    }
  );

  fastify.delete(
    `${apiVersion}/posts`,
    async (request: FastifyRequest, reply: FastifyReply) => {
      await postController.deletePost(request, reply);
    }
  );
}

export default postRoutes;
