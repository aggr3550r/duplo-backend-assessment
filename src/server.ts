import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { AppContext } from './types';
import 'reflect-metadata';

import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

const app = Fastify({ logger: true });

const prisma = new PrismaClient();

app.decorate('prisma', prisma);

export const CONTEXT: AppContext = {
  prisma,
};

app.get('/api/v1/health', async (request, reply) => {
  try {
    return { status: 'ok', message: 'Server is healthy' };
  } catch (error) {
    reply.status(500).send({ status: 'error', message: 'Server is unhealthy' });
  }
});
app.register(postRoutes);
app.register(userRoutes);

const start = async () => {
  try {
    await app.listen(8000);
    console.log(`Server is running on http://localhost:8000`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
