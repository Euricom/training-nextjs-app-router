import { ZodError } from 'zod';
import { BadRequestError, ConflictError, NotFoundError } from './errors';
import responses from './responses';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { FetchError } from '@/utils/api/client';
import type { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler<TData> = (request: Request, context: any) => Promise<NextResponse<TData>>;

const withErrorHandling = <TData>(handler: Handler<TData>): Handler<TData> => {
  return async function (request: Request, context: unknown) {
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof FetchError) {
        // fetch errors (coming from 3th party apis) are always bad gateway
        return responses.badGateway({ message: error.message });
      }
      if (error instanceof NotFoundError) {
        return responses.notFound(error.message);
      }
      if (error instanceof ConflictError) {
        return responses.conflict(error.code, error.message);
      }
      if (error instanceof BadRequestError) {
        return responses.badRequest({ message: error.message, errors: error.errors });
      }
      if (error instanceof ZodError) {
        // a zod error is always a bad request
        const errors = error.issues.map((issue) => {
          return {
            key: issue.path[0],
            message: issue.message,
          };
        });
        return responses.badRequest({
          message: 'One or more fields are invalid',
          errors,
        });
      }
      if (error instanceof PrismaClientValidationError) {
        // special case for prisma validation errors
        return responses.internalServerError({
          message: error.message,
          details: error.stack?.replace(error.message, ''), // prisma error messages are duplicated in the stack trace
        });
      }
      if (error instanceof Error) {
        // if nothing else just return a 500
        return responses.internalServerError({
          message: error.message,
          details: error.stack,
        });
      }
      throw error;
    }
  };
};

export default withErrorHandling;
