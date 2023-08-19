import { prisma } from '@/server/db';
import NextResponse, { withErrorHandling } from '@/utils/http/responses';

type Context = {
  params: {
    id: string;
  };
};

export const GET = (_request: Request, { params }: Context) => {
  return withErrorHandling(async () => {
    const customer = await prisma.customer.findFirst({
      where: {
        CustomerId: Number(params.id),
      },
    });
    if (!customer) {
      return NextResponse.notFound(`Customer with id ${params.id} not found`);
    }
    return NextResponse.ok(customer);
  });
};
