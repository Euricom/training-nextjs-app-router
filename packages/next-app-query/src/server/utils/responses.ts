/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import { NextResponse } from 'next/server';
import superJSON from 'superjson';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

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

export const error = (status: number, message: string, details?: unknown) => {
  return NextResponse.json<any>(
    {
      code: getReasonPhrase(status),
      message,
      details,
    },
    { status: status }
  );
};

export const notFound = (message = 'The resource is not found') => {
  return NextResponse.json<any>(
    {
      code: getReasonPhrase(StatusCodes.NOT_FOUND),
      message,
    },
    { status: StatusCodes.NOT_FOUND }
  );
};

export const noContent = () => {
  return new NextResponse<any>(null, {
    status: StatusCodes.NO_CONTENT,
  });
};

export default {
  json,
  superjson,
  error,
  notFound,
  noContent,
} as const;
