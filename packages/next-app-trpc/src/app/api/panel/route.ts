import { renderTrpcPanel } from 'trpc-panel';
import { appRouter } from '@/server/api/root';
import { getBaseUrl } from '@/utils/trpc/shared';

export const GET = (_req: Request) => {
  const panel = renderTrpcPanel(appRouter, {
    url: `${getBaseUrl()}/api/trpc`,
    transformer: 'superjson',
  });
  return new Response(panel, {
    headers: {
      'content-type': 'text/html',
    },
  });
};
