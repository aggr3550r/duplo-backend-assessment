// import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
// import mocked from 'ts-jest';
// import { postController } from '../src/container/';

// jest.mock('../container');

// const mockedPostController = mocked(postController, true);

// describe('PostController Tests', () => {
//   let fastify: FastifyInstance;

//   beforeAll(() => {
//     fastify = {} as FastifyInstance; // Replace with your actual Fastify instance
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it('should test createPost method', async () => {
//     // Mock necessary Fastify objects
//     const request = {} as FastifyRequest;
//     const reply = {
//       code: jest.fn(),
//       send: jest.fn(),
//     } as unknown as FastifyReply;

//     // Mock dependencies
//     const mockCreatePost = jest.fn();
//     mockedPostController.createPost.mockImplementationOnce(mockCreatePost);

//     // Call the method
//     await postController.createPost(request, reply);

//     // Assert expected calls
//     expect(mockCreatePost).toHaveBeenCalledWith(/* Mock arguments as needed */);
//     expect(reply.code).toHaveBeenCalledWith(/* Expected status code */);
//     expect(reply.send).toHaveBeenCalledWith(/* Expected response */);
//   });

//   // Repeat similar steps for other methods...
// });
