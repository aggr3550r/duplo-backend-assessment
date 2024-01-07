import fastify from 'fastify';
const app = fastify({ logger: true });

//TODO: Remove
app.get('/', async (request, reply) => {
  return { hello: 'world' };
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
