export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const getFullUrl = (path: string, baseUrl?: string) => {
  if (path.startsWith('http')) return path;
  if (!baseUrl) return path;
  const url = new URL(path, baseUrl);
  return url.href;
};
