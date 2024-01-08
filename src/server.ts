import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { AppContext } from './types';
import 'reflect-metadata';

import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';
import { configService } from './config/config.service';

const app = Fastify({ logger: true });
const PORT = configService.getPort() || 8000;

const prisma = new PrismaClient();

app.decorate('prisma', prisma);

export const CONTEXT: AppContext = {
  prisma,
};

app.register(postRoutes);
app.register(userRoutes);

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
