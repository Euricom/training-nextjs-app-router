'use client';

import { loggerLink } from '@trpc/client';
import { getUrl } from './shared';
import {
  experimental_createActionHook as createActionHook,
  experimental_createTRPCNextAppDirClient as createTRPCNextAppDirClient,
  experimental_serverActionLink as serverActionLink,
} from '@trpc/next/app-dir/client';
import { experimental_nextHttpLink as nextHttpLink } from '@trpc/next/app-dir/links/nextHttp';
import superjson from 'superjson';
import type { AppRouter } from '@/server/api/root';

export const useAction = createActionHook({
  links: [loggerLink(), serverActionLink()],
  transformer: superjson,
});

export const trpc = createTRPCNextAppDirClient<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (op) => true,
        }),
        nextHttpLink({
          batch: true,
          url: getUrl(),
          headers() {
            return {
              'x-trpc-source': 'client',
            };
          },
        }),
      ],
    };
  },
});
