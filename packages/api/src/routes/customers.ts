import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { prisma } from '../db';
import { z } from 'zod';
import { getOrderBy } from '../utils/db/query';
import { getSearchParams } from '../utils/http/params';
import { notFound } from '../utils/http/responses';

const GetParamsSchema = z.object({
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  sortBy: z.string().optional(),
});

const customerUpdateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

const customers = new Hono()
  .get('/', async (ctx) => {
    const { page = 0, pageSize = 50, sortBy = 'lastName' } = getSearchParams(ctx.req, GetParamsSchema);
    console.log(`  page=${page}, pageSize=${pageSize}, sortBy=${sortBy}`);

    const customers = await prisma.customer.findMany({
      skip: page * pageSize,
      take: pageSize,
      orderBy: getOrderBy(sortBy),
    });
    return ctx.jsonT(customers);
  })
  .get('/:id', async (ctx) => {
    const id = Number(ctx.req.param('id'));

    const customer = await prisma.customer.findFirst({
      where: { id },
    });
    if (!customer) {
      throw new HTTPException(404, {
        res: ctx.json(notFound(`Customer with id ${id} not found`)),
      });
    }
    return ctx.jsonT(customer);
  })
  .put('/:id', async (ctx) => {
    const id = Number(ctx.req.param('id'));
    const body = await ctx.req.json();
    const data = customerUpdateSchema.parse(body);

    console.log(`PUT /customers/${id}`);

    const customer = await prisma.customer.update({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
      where: { id },
    });
    return ctx.jsonT(customer);
  });

export default customers;
