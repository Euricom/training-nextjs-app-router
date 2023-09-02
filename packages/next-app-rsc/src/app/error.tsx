'use client';

function ErrorPage() {
  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">Employees</h1>
      <p>ERROR: unable to retrieve employees</p>
      <p>Make sure you run the API</p>
    </div>
  );
}

export default ErrorPage;
