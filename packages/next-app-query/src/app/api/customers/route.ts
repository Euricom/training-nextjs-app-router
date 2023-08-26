import { z } from 'zod';
import NextResponse from '@/server/utils/responses';
import { getSearchParams } from '@/server/utils/params';
import { prisma } from '@/server/db';
import { getOrderBy } from '@/server/utils/prisma';
import withErrorHandling from '@/server/utils/withErrorHandling';

const GetParamsSchema = z.object({
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  sortBy: z.string().optional(),
});

export const GET = withErrorHandling(async (request: Request) => {
  const { page = 0, pageSize = 50, sortBy = 'lastName' } = getSearchParams(request, GetParamsSchema);
  console.log(`GET /api/customers - page=${page}, pageSize=${pageSize}, sortBy=${sortBy}`);

  const customers = await prisma.customer.findMany({
    skip: page * pageSize,
    take: pageSize,
    orderBy: getOrderBy(sortBy),
  });

  return NextResponse.ok(customers);
});

const customerCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const data = customerCreateSchema.parse(body);
  console.log(`POST /api/customers`, data);

  const customer = await prisma.customer.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  });
  return NextResponse.ok(customer);
});

export type { Customer } from '@prisma/client';
