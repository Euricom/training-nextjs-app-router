/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import { NextResponse } from 'next/server';
import superJSON from 'superjson';

type ExtractNextResponseType<Type> = Type extends NextResponse<infer X> ? X : never;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

// Utility type to extract the response type from a handler
export type InferResponseType<T extends (...args: any) => any> = ExtractNextResponseType<Awaited<ReturnType<T>>>;

/**
 * Return a json NextResponse with the given body and status code
 * @param body Accepts a plain object, array or string (useful when using superjson.stringify)
 * @param statusCode
 * @returns
 */
export const json = <TData extends Record<string, unknown> | string | Array<unknown>>(
  body: TData,
  statusCode = 200
) => {
  if (isPlainObject(body) || Array.isArray(body)) {
    return NextResponse.json<TData>(body, { status: statusCode });
  }
  return new Response(body.toString(), {
    status: statusCode ?? 200,
    headers: { 'Content-Type': 'application/json' },
  }) as NextResponse<TData>;
};

/**
 * Return a json NextResponse using superjson.stringify
 * @param body Accepts a plain object and array
 * @param statusCode Defaults to 200
 * @returns
 */
export const superjson = <TData extends Record<string, unknown> | Array<unknown>>(body: TData, statusCode = 200) => {
  return json<TData>(superJSON.stringify(body) as any, statusCode);
};

export const conflict = (code: number, message: string) => {
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
  return NextResponse.json<any>(
    {
      error: 'InternalServerError',
      message,
      details,
    },
    { status: 500 }
  );
};

export const badGateway = ({ message, details }: { message: string; details?: unknown }) => {
  return NextResponse.json<any>(
    {
      error: 'BadGateway',
      message,
      details,
    },
    { status: 502 }
  );
};

export const notFound = (message = 'The resource is not found') => {
  return NextResponse.json<any>(
    {
      error: 'NotFound',
      message,
    },
    { status: 404 }
  );
};

export const noContent = () => {
  return new NextResponse<any>(null, {
    status: 204,
  });
};

export const unauthorized = (message = 'Missing or invalid session') => {
  return NextResponse.json<any>(
    {
      error: 'Unauthorized',
      message,
    },
    { status: 401 }
  );
};

export const badRequest = ({ message, errors }: { message: string; errors?: unknown }) => {
  return NextResponse.json<any>(
    {
      error: 'BadRequest',
      message,
      errors,
    },
    { status: 404 }
  );
};

export default {
  json,
  superjson,
  internalServerError,
  conflict,
  unauthorized,
  badGateway,
  notFound,
  noContent,
  badRequest,
} as const;
