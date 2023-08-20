import dotenv from 'dotenv';
import { serve } from '@hono/node-server';
import app from './app';

dotenv.config();

const POST = 8080;

console.log(`Starting server on http://localhost:${POST}`);
serve({
  fetch: app.fetch,
  port: POST,
});
