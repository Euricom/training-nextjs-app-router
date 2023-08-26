import Head from 'next/head';
import CustomerList from './customerList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Awesome App</title>
        <meta name="description" content="Peter's super awesome next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="mb-3 text-xl font-bold">Customers Page</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CustomerList className="mt-2" />
        </Suspense>
      </main>
    </>
  );
}
