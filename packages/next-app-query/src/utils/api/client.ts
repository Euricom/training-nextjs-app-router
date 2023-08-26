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

function isPlainObject(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * A better fetch API :)
 *
 * Usage:
 * ```
 * const user = await xFetch<User>('/api/user');
 * ```
 * @param url     The url to fetch
 * @param options Fetch options like headers etc
 * @returns
 */
export function xFetch<TData>(input: RequestInfo, options?: Options): Promise<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let init: any = options;
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
  return fetch(input, init)
    .then((res) => {
      if (!res.ok) {
        const url = typeof input === 'string' ? input : undefined;
        throw new FetchError(res.status, res.statusText, url);
      }
      return Promise.all([res, res.text()]);
    })
    .then(([res, body]) => {
      const contentType = res.headers.get('Content-Type');
      if (contentType?.includes('application/json')) {
        // faster than JSON.parse,
        // and safe fallback when its not JSON
        return destr<TData>(body);
      }
      return body;
    }) as Promise<TData>;
}

type ApiOptions = {
  baseUrl: string;
  headers?: Record<string, string>;
};

const getFullUrl = (path: string, baseUrl?: string) => {
  if (path.startsWith('http')) return path;
  if (!baseUrl) return path;
  const url = new URL(path, baseUrl);
  return url.href;
};

/**
 * Create an api client to be used for API calls.
 * Similar to axios.create()
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
    get<TData>(path: string, options?: RequestInit) {
      const url = getFullUrl(path, rootOptions.baseUrl);
      console.log('GET', url);
      return xFetch<TData>(url, {
        ...options,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
    put<TData = unknown>(
      path: string,
      body: BodyInit | null | undefined | Record<string, unknown>,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      const url = getFullUrl(path, rootOptions.baseUrl);
      console.log('PUT', url);
      return xFetch<TData>(url, {
        ...options,
        method: 'PUT',
        body,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
    post<TData = unknown>(
      path: string,
      body: BodyInit | null | undefined | Record<string, unknown>,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      const url = getFullUrl(path, rootOptions.baseUrl);
      console.log('PUT', url);
      return xFetch<TData>(url, {
        ...options,
        method: 'POST',
        body,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
    delete<TData = unknown>(path: string, options?: Omit<RequestInit, 'method'>) {
      const url = getFullUrl(path, rootOptions.baseUrl);
      return xFetch<TData>(url, {
        ...options,
        method: 'DELETE',
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
  };
}

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const api = create({
  baseUrl: getBaseUrl(),
});

export type ApiInstance = ReturnType<typeof create>;
