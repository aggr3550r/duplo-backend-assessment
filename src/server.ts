import Fastify from 'fastify';
import 'reflect-metadata';
import http from 'http';

import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';
import { configService } from './config/config.service';

const app = Fastify({ logger: true });

app.get('/api/v1/health', async (request, reply) => {
  try {
    return { status: 'ok', message: 'Server is healthy' };
  } catch (error) {
    reply.status(500).send({ status: 'error', message: 'Server is unhealthy' });
  }
});
app.register(postRoutes);
app.register(userRoutes);

const PORT = configService.getPort() || 8000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.info(`HTTP Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
