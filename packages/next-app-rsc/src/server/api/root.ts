import { env } from '@/env.mjs';

export class FetchError extends Error {
  constructor(public status: number, public statusText: string, public url?: string) {
    super(`${status} ${statusText} (${url})`);
  }
}

const fetcher = <TData>(input: RequestInfo, options?: RequestInit): Promise<TData> => {
  if (typeof input === 'string') {
    const url = `${env.API_SERVER_URL}/${input}`;
    return fetch(url, options).then((res) => {
      if (!res.ok) {
        throw new FetchError(res.status, res.statusText, url);
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
};

const api = {
  get<TData>(url: string, options?: RequestInit) {
    console.log('GET', url, options);
    return fetcher<TData>(url, options);
  },
  put<TData = unknown>(url: string, body: BodyInit | null | undefined, options?: Omit<RequestInit, 'method' | 'body'>) {
    console.log('PUT', url, body, options);
    return fetcher<TData>(url, { ...options, method: 'PUT', body });
  },
  post<TData = unknown>(
    url: string,
    body: BodyInit | null | undefined,
    options?: Omit<RequestInit, 'method' | 'body'>
  ) {
    console.log('POST', url, body, options);
    return fetcher<TData>(url, { ...options, method: 'POST', body });
  },
  delete<TData = unknown>(url: string, options?: Omit<RequestInit, 'method'>) {
    console.log('DELETE', url, options);
    return fetcher<TData>(url, { ...options, method: 'DELETE' });
  },
  // for all other methods
  fetch<TData>(input: RequestInfo, options?: RequestInit) {
    return fetcher<TData>(input, options);
  },
};

export default api;

export type ApiInstance = typeof api;
