import { FetchError } from '@/utils/api/client';
import responses from '../utils/responses';
import { RequestError } from '../utils/errors';
import { ZodError } from 'zod';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { type NextHandler } from './compose';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = async (req: Request, ctx: unknown, next: NextHandler) => {
  try {
    return await next();
  } catch (error) {
    if (error instanceof FetchError) {
      // fetch errors (coming from 3th party apis) are always bad gateway
      return responses.error(StatusCodes.BAD_GATEWAY, error.message);
    }
    if (error instanceof RequestError) {
      return responses.error(error.status, error.message);
    }
    if (error instanceof ZodError) {
      // a zod error is always a bad request
      const errors = error.issues.map((issue) => {
        return {
          key: issue.path[0],
          message: issue.message,
        };
      });
      return responses.error(StatusCodes.BAD_REQUEST, 'One or more fields are invalid', errors);
    }

    if (error instanceof Error) {
      // all else just return a 500
      let details = error.stack;
      if (error instanceof PrismaClientValidationError) {
        // prisma error messages are duplicated in the stack trace
        details = error.stack?.replace(error.message, '');
      }
      return responses.error(StatusCodes.INTERNAL_SERVER_ERROR, error.message, details);
    }
    throw error;
  }
};

export default errorHandler;
