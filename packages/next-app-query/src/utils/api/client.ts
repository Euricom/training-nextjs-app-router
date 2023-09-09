/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBaseUrl, getFullUrl } from './url';
import superjson from 'superjson';
import destr from 'destr';

/**
 * API Client to be used for 3th party API calls.
 * These can be direct of proxy calls
 *
 * This is a simple wrapper around fetch with error handling
 *
 * Usage:
 * ```
 * import { api } from '@/server/api/client';
 *
 * const customers = await api.get('/api/customers');
 * const user = await api.post('/api/user', { name: 'John' });
 * ```
 */

export class FetchError extends Error {
  constructor(public status: number, public statusText: string, public url?: string) {
    super(`${status} ${statusText} (${url})`);
  }
}

interface Options extends Omit<RequestInit, 'body'> {
  body?: BodyInit | null | undefined | Record<string, unknown>;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * A better fetch API
 * - Includes http error handling
 * - Automatically parse json response
 * - Automatically stringify json body
 * - Automatically support for superjson parse
 *
 * Usage:
 * ```
 * const user = await xFetch<User>('/api/user');
 * ```
 * @param url     The url to fetch
 * @param options Fetch options like headers etc
 * @returns
 */
export async function xFetch<TData>(input: RequestInfo, options?: Options): Promise<TData> {
  let init: any = options;

  // transform body to json if needed
  if (isPlainObject(options?.body)) {
    init = {
      ...options,
      body: JSON.stringify(options?.body),
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    };
  }

  // the actual fetch call
  const res = await fetch(input, init);

  // handle http errors
  if (!res.ok) {
    const url = typeof input === 'string' ? input : undefined;
    throw new FetchError(res.status, res.statusText, url);
  }

  // parse the response body when json or superjson
  const body = await res.text();
  const contentType = res.headers.get('Content-Type');
  if (contentType?.includes('application/json')) {
    if (body.includes('meta')) {
      return superjson.parse<TData>(body);
    }
    // fast json parse with https://www.npmjs.com/package/destr
    return destr<TData>(body);
  }

  return body as TData;
}

type ApiOptions = {
  baseUrl: string;
  headers?: Record<string, string>;
};

/**
 * Create an api client to be used for API calls.
 * Similar to axios.create().
 *
 * Usage:
 * ```
 * import { create } from '@/server/api/client';
 *
 * const api = create({
 *   baseUrl: 'https://api.example.com',
 * });
 * const customers = await api.get('/api/customers');
 * const user = await api.post('/api/user', { name: 'John' });
 * ```
 */
export function create(rootOptions: ApiOptions) {
  return {
    request<TData = unknown>(
      path: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      body: BodyInit | null | undefined | Record<string, unknown>,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      const url = getFullUrl(path, rootOptions.baseUrl);
      console.log(method, url);
      return xFetch<TData>(url, {
        ...options,
        method,
        body,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },

    get<TData>(path: string, options?: RequestInit) {
      return this.request<TData>(path, 'GET', undefined, options);
    },
    put<TData = unknown>(
      path: string,
      body: BodyInit | null | undefined | Record<string, unknown>,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      return this.request<TData>(path, 'PUT', body, options);
    },
    post<TData = unknown>(
      path: string,
      body: BodyInit | null | undefined | Record<string, unknown>,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      return this.request<TData>(path, 'POST', body, options);
    },
    delete<TData = unknown>(path: string, options?: Omit<RequestInit, 'method'>) {
      return this.request<TData>(path, 'DELETE', undefined, options);
    },
  };
}

export const api = create({
  baseUrl: getBaseUrl(),
});

export type ApiInstance = ReturnType<typeof create>;
