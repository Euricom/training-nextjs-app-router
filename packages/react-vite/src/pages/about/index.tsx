import { Link } from 'react-router-dom';

const Page = () => {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">About Page</h1>
      <p>This is the about content</p>
      <Link className="underline" to="/">
        Go Back
      </Link>
    </>
  );
};

export default Page;
