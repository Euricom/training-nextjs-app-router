// import type { Customer } from '@prisma/client';
import { prisma } from '@/server/db';
import { json, noContent, type InferResponseType } from '@/server/utils/responses';
import { z } from 'zod';
import withErrorHandling from '@/server/utils/withErrorHandling';
import { NotFoundError } from '@/server/utils/errors';

type Context = {
  params: {
    id: string;
  };
};

export const GET = withErrorHandling(async (_request: Request, { params }: Context) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  if (!customer) {
    throw new NotFoundError(`Customer with id ${params.id} not found`);
  }
  return json(customer);
});

export type Customer = InferResponseType<typeof GET>;

export const DELETE = withErrorHandling(async (_request: Request, { params }: Context) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  if (!customer) return noContent();

  await prisma.customer.delete({
    where: {
      id: Number(params.id),
    },
  });

  return json(customer);
});

const customerUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
});

export type CustomerUpdate = z.infer<typeof customerUpdateSchema>;

export const PUT = withErrorHandling(async (request: Request, { params }: Context) => {
  const body = await request.json();
  const data = customerUpdateSchema.parse(body);

  const customer = await prisma.customer.update({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
    where: {
      id: Number(params.id),
    },
  });
  return json(customer);
});
