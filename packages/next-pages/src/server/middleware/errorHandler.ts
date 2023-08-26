/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextHandler } from 'next-connect';
import { env } from '@/env.mjs';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { BadRequestError, RequestError } from '../errors';

const errorHandler = (_req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  return next().catch((err: unknown) => {
    if (err instanceof Error) {
      if (err instanceof BadRequestError) {
        return res.status(err.statusCode).json({
          code: err.statusText,
          message: err.message,
          errors: err.errors,
        });
      }

      if (err instanceof RequestError) {
        return res.status(err.statusCode).json({
          code: err.statusText,
          message: err.message,
        });
      }

      if (err instanceof ZodError) {
        // a zod error is always a bad request
        const errors = err.issues.map((issue) => {
          return {
            key: issue.path[0],
            message: issue.message,
          };
        });
        return res.status(400).json({
          code: ' BadRequest',
          message: 'One or more fields are invalid',
          errors,
        });
      }

      //
      // any other Error is a InternalServerError
      //

      let details = err.stack;
      if (err instanceof PrismaClientValidationError) {
        // the message is repeated in the stack trace, so remove it
        details = err.stack?.replace(err.message, '');
      }

      return res.status(500).json({
        code: 'InternalServerError',
        message: err.message,
        details: env.NODE_ENV === 'development' ? details : undefined,
      });
    }

    // unknown error, just rethrow it (keeps TS happy)
    throw err;
  });
};

export default errorHandler;
