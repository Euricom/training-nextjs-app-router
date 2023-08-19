import dotenv from 'dotenv';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import customers from './routes/customer';
import { HTTPException } from 'hono/http-exception';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

dotenv.config();

const app = new Hono()
  .get('/', (c) =>
    c.jsonT({
      message: 'Hello Hono!',
    })
  )
  .route('/customers', customers)
  .onError((err, ctx) => {
    if (err instanceof HTTPException) {
      return err.getResponse();
    }
    if (err instanceof PrismaClientValidationError) {
      return ctx.json(
        {
          message: err.message,
          details: err.stack?.replace(err.message, ''), // prisma error messages are duplicated in the stack trace
        },
        { status: 500 }
      );
    }
    return ctx.json(
      {
        message: err.message,
        details: err.stack,
      },
      { status: 500 }
    );
  });

export type AppRouter = typeof app;

console.log('Starting server on http://localhost:3000');
serve({
  fetch: app.fetch,
  port: 3000,
});
