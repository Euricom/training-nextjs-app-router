import { version } from 'react';

export default function Features() {
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">About Page</h1>
      <p>React version: {version}</p>
      <div></div>
      <a className="underline" href="/">
        Go Back
      </a>
    </>
  );
}
