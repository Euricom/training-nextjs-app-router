import type { Customer } from '@prisma/client';
import { prisma } from '@/server/db';
import NextResponse, { withErrorHandling } from '@/utils/http/responses';
import { z } from 'zod';

type Context = {
  params: {
    id: string;
  };
};

// TODO: refactor with https://www.npmjs.com/package/next-connect

export const GET = (_request: Request, { params }: Context) => {
  return withErrorHandling(async () => {
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
};

const customerUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type CustomerUpdate = z.infer<typeof customerUpdateSchema>;

export const PUT = (request: Request, { params }: Context) => {
  return withErrorHandling(async () => {
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
};

export type { Customer };
