import 'server-only';
import { NextResponse } from 'next/server';

export const ok = (body: unknown, statusCode?: number) => {
  return NextResponse.json(body, { status: statusCode ?? 200 });
};

export const conflict = (code: string, message: string) => {
  return NextResponse.json(
    {
      error: 'Conflict',
      code,
      message,
    },
    { status: 409 }
  );
};

export const internalServerError = ({ message, details }: { message: string; details?: unknown }) => {
  return NextResponse.json(
    {
      error: 'InternalServerError',
      message,
      details,
    },
    { status: 500 }
  );
};

export const notFound = (message = 'The resource is not found') => {
  return NextResponse.json(
    {
      error: 'NotFound',
      message,
    },
    { status: 404 }
  );
};

export const noContent = () => {
  return new Response(null, {
    status: 204,
  });
};

export const badRequest = ({ message, errors }: { message: string; errors?: unknown }) => {
  return NextResponse.json(
    {
      error: 'BadRequest',
      message,
      errors,
    },
    { status: 404 }
  );
};

export default {
  ok,
  internalServerError,
  conflict,
  notFound,
  noContent,
  badRequest,
} as const;
