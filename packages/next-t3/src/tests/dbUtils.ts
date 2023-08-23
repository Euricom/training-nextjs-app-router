import { prisma } from '@/server/db';

export const clearDB = async () => {
  await prisma.$transaction([
    prisma.invoiceLine.deleteMany(),
    prisma.invoice.deleteMany(),
    prisma.customer.deleteMany(),
    prisma.employee.deleteMany(),
    // add others here
  ]);
};
