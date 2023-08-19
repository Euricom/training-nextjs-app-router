import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

/**
 * To guarantee that data remains isolated between users and requests,
 * while still maintaining a single QueryClient instance per request,
 * we can create a request-scoped singleton instance of QueryClient.
 */
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
