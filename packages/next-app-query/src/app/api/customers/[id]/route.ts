import type { Customer } from '@prisma/client';
import { prisma } from '@/server/db';
import NextResponse from '@/server/utils/responses';
import { z } from 'zod';
import withErrorHandling from '@/server/utils/withErrorHandling';

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
    return NextResponse.notFound(`Customer with id ${params.id} not found`);
  }
  return NextResponse.ok(customer);
});

export const DELETE = withErrorHandling(async (_request: Request, { params }: Context) => {
  const customer = await prisma.customer.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  if (!customer) return NextResponse.noContent();

  await prisma.customer.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.ok(customer);
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
  return NextResponse.ok(customer);
});

export type { Customer };
