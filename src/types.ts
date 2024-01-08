import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';

export interface AppContext {
  prisma: PrismaClient;
}

export interface CustomRequest extends FastifyRequest {
  user?: {
    id: string;
    email: string;
  };
}