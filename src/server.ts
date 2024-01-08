import Fastify from 'fastify';
import { configService } from './config/config.service';

const app = Fastify({ logger: true });

//TODO: Remove
app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const fastify = Fastify();

// Register fastify-jwt with your secret key
fastify.register(require('fastify-jwt'), {
  secret: configService.getValue('JWT_SECRET'),
});

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
