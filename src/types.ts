import { PrismaClient } from '@prisma/client';

export interface AppContext {
  prisma: PrismaClient;
}
