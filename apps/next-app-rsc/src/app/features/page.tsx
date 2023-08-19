import Link from 'next/link';

export default function Features() {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Feature Page</h1>
      <p>This is the main feature area</p>
      <Link className="underline" href="/">
        Go Back
      </Link>
    </>
  );
}
