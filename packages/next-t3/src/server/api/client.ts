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

/**
 * Mini wrapper around fetch with error handling
 * type casting and json handling
 *
 * Usage:
 * ```
 * const user = await oFetch<User>('/api/user');
 * ```
 * @param url     The url to fetch
 * @param options Fetch options like headers etc
 * @returns
 */
export function oFetch<TData>(input: RequestInfo, options?: RequestInit): Promise<TData> {
  if (typeof input === 'string') {
    return fetch(input, options).then((res) => {
      if (!res.ok) {
        throw new FetchError(res.status, res.statusText, input);
      }
      return res.json();
    }) as Promise<TData>;
  }
  return fetch(input, options).then((res) => {
    if (!res.ok) {
      throw new FetchError(res.status, res.statusText);
    }
    return res.json();
  }) as Promise<TData>;
}

/**
 * Fetch data from the server
 * Usage:
 * ```
 * const user = await get<User>('/api/user');
 * ```
 * @param url     The url to fetch
 * @param options Fetch options like headers etc
 * @returns
 */
export function get<TData>(url: string, options?: RequestInit) {
  console.log('GET', url);
  return oFetch<TData>(url, options);
}

/**
 * PUT data to the server
 * Usage:
 * ```
 * const user = await put<User>('/api/user', { name: 'john' });
 * ```
 * @param url     The url to put
 * @param options Fetch options like headers etc
 * @returns
 */
export function put<TData = unknown>(
  url: string,
  body: BodyInit | null | undefined,
  options?: Omit<RequestInit, 'method' | 'body'>
) {
  console.log('PUT', url, body, options);
  return oFetch<TData>(url, { ...options, method: 'PUT', body });
}

/**
 * POST data to the server
 * Usage:
 * ```
 * const user = await post<User>('/api/user', { name: 'john' });
 * ```
 * @param url     The url to POST
 * @param options Fetch options like headers etc
 * @returns
 */
export function post<TData = unknown>(
  url: string,
  body: BodyInit | null | undefined,
  options?: Omit<RequestInit, 'method' | 'body'>
) {
  console.log('POST', url, body, options);
  return oFetch<TData>(url, { ...options, method: 'POST', body });
}

/**
 * DELETE resource on the server
 * Usage:
 * ```
 * const user = await del<User>('/api/user');
 * ```
 * @param url     The url to delete
 * @param options Fetch options like headers etc
 * @returns
 */
export function del<TData = unknown>(url: string, options?: Omit<RequestInit, 'method'>) {
  console.log('DELETE', url);
  return oFetch<TData>(url, { ...options, method: 'DELETE' });
}

type ApiOptions = {
  baseUrl: string;
  headers?: Record<string, string>;
};

/**
 * Create a api client to be used for 3th party API calls.
 * These can be direct of proxy calls
 *
 * This is a simple wrapper around fetch with error handling
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
      const url = new URL(path, rootOptions.baseUrl);
      return get<TData>(url.href, {
        ...options,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
    put<TData = unknown>(
      path: string,
      body: BodyInit | null | undefined,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      const url = new URL(path, rootOptions.baseUrl);
      return put<TData>(url.href, body, {
        ...options,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
    post<TData = unknown>(
      path: string,
      body: BodyInit | null | undefined,
      options?: Omit<RequestInit, 'method' | 'body'>
    ) {
      const url = new URL(path, rootOptions.baseUrl);
      return post<TData>(url.href, body, {
        ...options,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
    delete<TData = unknown>(path: string, options?: Omit<RequestInit, 'method'>) {
      const url = new URL(path, rootOptions.baseUrl);
      return del<TData>(url.href, {
        ...options,
        headers: {
          ...rootOptions.headers,
          ...options?.headers,
        },
      });
    },
  };
}

export type ApiInstance = ReturnType<typeof create>;
