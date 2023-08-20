import { Prisma, PrismaClient, Artist } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn'], // ['query', 'info', 'warn']
});

export { prisma };
