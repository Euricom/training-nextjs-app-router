import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { prisma } from '../db';
import { notFound } from '../utils/http/responses';
import { Employee } from '@prisma/client';

const artist = new Hono()
  .get('/', async (ctx) => {
    const employees = await prisma.employee.findMany({});
    return ctx.json(employees);
  })
  .get('/:id', async (ctx) => {
    const id = Number(ctx.req.param('id'));
    const entity = await prisma.employee.findFirst({
      where: { id },
    });
    if (!artist) {
      throw new HTTPException(404, {
        res: ctx.json(notFound()),
      });
    }
    return ctx.json(entity);
  });

export default artist;
