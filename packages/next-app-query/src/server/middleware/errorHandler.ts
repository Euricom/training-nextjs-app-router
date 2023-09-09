import { FetchError } from '@/utils/api/client';
import responses from '../utils/responses';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../utils/errors';
import { ZodError } from 'zod';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { type NextHandler } from './compose';

export const errorHandler = async (req: Request, ctx: unknown, next: NextHandler) => {
  try {
    return await next();
  } catch (error) {
    if (error instanceof FetchError) {
      // fetch errors (coming from 3th party apis) are always bad gateway
      return responses.badGateway({ message: error.message });
    }
    if (error instanceof NotFoundError) {
      return responses.notFound(error.message);
    }
    if (error instanceof UnauthorizedError) {
      return responses.unauthorized();
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

export default errorHandler;
