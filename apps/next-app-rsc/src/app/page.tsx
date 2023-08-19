import { prisma } from '@/server/db';
import CustomerList from './_components/customerList';

export default async function Home() {
  const customers = await prisma.customer.findMany({});
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Home Page</h1>
      <CustomerList className="mt-2" customers={customers} />
    </>
  );
}
