import Link from 'next/link';

function NotFound() {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Not Found</h1>
      <p>Page not found.</p>
      <Link className="underline" href="/">
        Go Back
      </Link>
    </>
  );
}

export default NotFound;
