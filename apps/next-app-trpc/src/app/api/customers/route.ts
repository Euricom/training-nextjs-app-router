import { z } from 'zod';
import NextResponse, { withErrorHandling } from '@/server/httpUtils';
import { getSearchParams } from '@/server/requestUtils';
import { prisma } from '@/server/db';
import { getOrderBy } from '@/server/dbUtils';

const GetParamsSchema = z.object({
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  sortBy: z.string().optional(),
});

export const GET = (request: Request) => {
  return withErrorHandling(async () => {
    const { page = 0, pageSize = 20, sortBy = 'LastName' } = getSearchParams(request, GetParamsSchema);
    console.log(`getUsers: page=${page}, pageSize=${pageSize}, sortBy=${sortBy}`);

    const customers = await prisma.customer.findMany({
      skip: page * pageSize,
      take: pageSize,
      orderBy: getOrderBy(sortBy),
    });

    return NextResponse.ok(customers);
  });
};

export type { Customer } from '@prisma/client';
