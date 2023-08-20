/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import type { z, ZodType } from 'zod';

function getParamsInternal<TType>(params: URLSearchParams, schema: ZodType<TType>): TType {
  return schema.parse(
    Array.from(params.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string | undefined>)
  );
}

export function getParams<T extends ZodType<any, any, any>>(params: URLSearchParams, schema: T) {
  type ParamsType = z.infer<T>;
  return getParamsInternal<ParamsType>(params, schema);
}

export function getSearchParams<T extends ZodType<any, any, any>>(request: Pick<Request, 'url'>, schema: T) {
  type ParamsType = z.infer<T>;
  const url = new URL(request.url);
  return getParamsInternal<ParamsType>(url.searchParams, schema);
}
