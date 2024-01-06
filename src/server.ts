// server.ts

import fastify from 'fastify';

// Create a Fastify instance
const app = fastify({ logger: true });

// Define a sample route
app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Start the server
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
