/* eslint-disable import/no-anonymous-default-export */
import type { IncomingMessage, ServerResponse } from 'http';
import type { NextApiRequest } from 'next';
import httpProxy from 'http-proxy';
import { env } from '@/env.mjs';

/**
 * Proxy all unknown api request to external server
 * /api/customers -> app/api/customers/route.ts
 * /api/employees -> http://localhost:8080/api/employees
 *
 * REMARK:
 * Currently we can't migrate this proxy to the app folder
 * So, its the only one that stays in th pages folder
 */

// eslint-disable-next-line @typescript-eslint/require-await
const getAccessToken = async (_req: NextApiRequest) => {
  // add here your implementation to get the accessToken
  return '';
};

// our proxy instance
const proxy = httpProxy.createProxyServer();

export default async (req: NextApiRequest, res: ServerResponse<IncomingMessage>) => {
  const accessToken = await getAccessToken(req);

  // don't forward cookies
  req.headers.cookie = '';

  // proxy all requests to the API
  return new Promise<void>((resolve, reject) => {
    proxy
      .once('proxyReq', (req) => {
        console.log(`proxy: ${req.path} -> ${env.API_SERVER_URL}${req.path}`);
      })
      .web(
        req,
        res,
        {
          target: env.API_SERVER_URL,
          changeOrigin: true,
          headers: {
            // add fix headers here
            ...(accessToken ? { authorization: `bearer ${accessToken}` } : {}),
          },
        },
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
  });
};

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};
