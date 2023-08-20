import { Hono } from 'hono';
import { cors } from 'hono/cors';
import customers from './routes/customers';
import artists from './routes/artists';
import employees from './routes/employees';
import { HTTPException } from 'hono/http-exception';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const app = new Hono()
  .use('/api/*', cors())
  .get('/', (c) =>
    c.jsonT({
      message: 'Hello Hono!',
    })
  )
  .route('/api/customers', customers)
  .route('/api/artists', artists)
  .route('/api/employees', employees)
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

export default app;
