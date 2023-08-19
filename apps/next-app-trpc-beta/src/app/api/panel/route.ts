import { renderTrpcPanel } from 'trpc-panel';
import { appRouter } from '@/server/api/root';
import { getUrl } from '@/utils/trpc/shared';

export const GET = (_req: Request) => {
  const panel = renderTrpcPanel(appRouter, {
    url: `${getUrl()}`,
    transformer: 'superjson',
  });
  return new Response(panel, {
    headers: {
      'content-type': 'text/html',
    },
  });
};
