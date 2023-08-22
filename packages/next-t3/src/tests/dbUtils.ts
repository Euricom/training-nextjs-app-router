import { prisma } from '@/server/db';

export const clearDB = async () => {
  await prisma.$transaction([
    prisma.account.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.employee.deleteMany(),
    // add others here
  ]);
};
