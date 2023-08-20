import CustomerList from '@/components/customerList';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Home Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerList className="mt-2" />
      </Suspense>
    </div>
  );
};

export default Page;
