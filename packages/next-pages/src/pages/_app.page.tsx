import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import '@/styles.css';

import { Roboto } from 'next/font/google';
import Header from './_components/header';
import QueryProvider from '@/utils/query/provider';

// Automatically self-host Google Font with auto fallback to system fonts
// Fonts are included in the deployment and served from the same domain as your deployment.
// See https://nextjs.org/docs/app/building-your-application/optimizing/fonts & https://www.youtube.com/watch?v=L8_98i_bMMA
const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <div className={`font-sans antialiased ${roboto.variable}`}>
      <div className="relative min-h-screen md:flex">
        <SessionProvider session={session}>
          <QueryProvider>
            <Header />
            <main className="flex-1 p-10">
              <Component {...pageProps} />
            </main>
          </QueryProvider>
        </SessionProvider>
      </div>
    </div>
  );
};

export default MyApp;
