import { PrismaClient } from '@prisma/client';
import { env } from '@/env.mjs';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Open test DB when running in test runner (vitest)
    datasources: {
      db: {
        url: env.NODE_ENV === 'test' ? `file:${process.cwd()}/prisma/db-test.sqlite` : env.DATABASE_URL,
      },
    },
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
