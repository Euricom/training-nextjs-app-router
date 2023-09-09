import { z } from 'zod';
import { prisma } from '@/server/db';
import { json, type InferResponseType } from '@/server/utils/responses';
import { getSearchParams } from '@/server/utils/params';
import { getOrderBy } from '@/server/utils/prisma';
import { compose } from '@/server/middleware/compose';
import errorHandler from '@/server/middleware/errorHandler';
import { type AuthRequestContext, auth } from '@/server/middleware/auth';

const customerCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

const post = async (request: Request) => {
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
  return json(customer);
};

interface RequestContext extends AuthRequestContext {
  params: {
    id: string;
  };
}

const searchParamsSchema = z
  .object({
    page: z.coerce.number().optional(),
    pageSize: z.coerce.number().optional(),
    sortBy: z.string().optional(),
  })
  .strict();

const get = async (request: Request, context: RequestContext) => {
  console.log('get', context.session?.user.email);
  const { page = 0, pageSize = 50, sortBy } = getSearchParams(request, searchParamsSchema);
  console.log(`GET /api/customers - page=${page}, pageSize=${pageSize}, sortBy=${sortBy}`);

  const customers = await prisma.customer.findMany({
    skip: page * pageSize,
    take: pageSize,
    orderBy: getOrderBy(sortBy ?? 'lastName'),
  });
  const total = await prisma.customer.count();

  return json({
    total,
    page,
    pageSize,
    items: customers,
  });
};

export type CustomerPayload = InferResponseType<typeof get>;
export type Customer = CustomerPayload['items'][number];

export const GET = compose(errorHandler, auth, get);
export const POST = compose(errorHandler, auth, post);
