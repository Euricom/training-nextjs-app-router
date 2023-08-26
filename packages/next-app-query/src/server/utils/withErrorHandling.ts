import { ZodError } from 'zod';
import { BadRequestError, ConflictError, NotFoundError } from './errors';
import NextResponse from './responses';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler = (request: Request, context: any) => Promise<Response>;

const withErrorHandling = (handler: Handler) => {
  return async function (request: Request, context: unknown) {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return NextResponse.notFound(error.message);
      }
      if (error instanceof ConflictError) {
        return NextResponse.conflict(error.code, error.message);
      }
      if (error instanceof BadRequestError) {
        return NextResponse.badRequest({ message: error.message, errors: error.errors });
      }
      if (error instanceof ZodError) {
        // a zod error is always a bad request
        const errors = error.issues.map((issue) => {
          return {
            key: issue.path[0],
            message: issue.message,
          };
        });
        return NextResponse.badRequest({
          message: 'One or more fields are invalid',
          errors,
        });
      }
      if (error instanceof PrismaClientValidationError) {
        // special case for prisma validation errors
        return NextResponse.internalServerError({
          message: error.message,
          details: error.stack?.replace(error.message, ''), // prisma error messages are duplicated in the stack trace
        });
      }
      if (error instanceof Error) {
        // if nothing else just return a 500
        return NextResponse.internalServerError({
          message: error.message,
          details: error.stack,
        });
      }
    }
  };
};

export default withErrorHandling;
