import { z } from 'zod';
import NextResponse, { withErrorHandling } from '@/utils/http/responses';
import { getSearchParams } from '@/utils/http/params';
import { prisma } from '@/server/db';
import { getOrderBy } from '@/utils/db/query';

const GetParamsSchema = z.object({
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  sortBy: z.string().optional(),
});

export const GET = (request: Request) => {
  return withErrorHandling(async () => {
    const { page = 0, pageSize = 50, sortBy = 'lastName' } = getSearchParams(request, GetParamsSchema);
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
