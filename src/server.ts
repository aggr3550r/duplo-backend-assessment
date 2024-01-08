import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { AppContext } from './types';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

const app = Fastify({ logger: true });

const prisma = new PrismaClient();

export const CONTEXT: AppContext = {
  prisma,
};

app.register(postRoutes);
app.register(userRoutes);


const start = async () => {
  try {
    await app.listen(3000);
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
