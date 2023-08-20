import CustomerList from './_components/customerList';

export default function Home() {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Home Page</h1>
      <CustomerList className="mt-2" />
    </>
  );
}
