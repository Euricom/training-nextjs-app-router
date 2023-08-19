import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import QueryProvider from './queryProvider';

// Automatically self-host Google Font with auto fallback to system fonts
// Fonts are included in the deployment and served from the same domain as your deployment.
// See https://nextjs.org/docs/app/building-your-application/optimizing/fonts & https://www.youtube.com/watch?v=L8_98i_bMMA
const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

// Metadata is used to populate <head> tags in the HTML.
export const metadata: Metadata = {
  title: 'My Next App',
  description: "Peter's super awesome next app",
};

// This is the root layout for all pages. It is used by all pages
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
