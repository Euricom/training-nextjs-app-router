import { prisma } from '@/server/db';
import Link from 'next/link';
import { zfd } from 'zod-form-data';
import { ZodError, z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const getCustomer = (id: number) => {
  return prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
};

const schema = zfd.formData({
  id: zfd.numeric(),
  firstName: zfd.text(),
  lastName: zfd.text(),
  email: zfd.text(z.string().email()),
});

async function updateCustomer(data: FormData) {
  'use server';

  // transform and validate the formData
  try {
    const { id, firstName, lastName, email } = schema.parse(data);

    // update to db
    await prisma.customer.update({
      data: {
        firstName,
        lastName,
        email,
      },
      where: {
        id,
      },
    });

    // redirect to customers page when success
    redirect('/customers');
  } catch (err) {
    if (err instanceof ZodError) {
      revalidatePath('/');
      return err;
    }

    // we need to rethrow because the 'redirect'
    // is also working by throwing an error
    throw err;
  }
}

// This is a hacky solution (PeterC)
// The formErrors stay in memory but we need to clear them
// we could redirect with an ?error=true search param and based on the search
// param look at the error of not
//
// Lets hope that the stable version of Server Actions will handle this
let formErrors: Record<string, string[] | undefined>;

export default async function CustomerFormPage(props: { params: { id: string } }) {
  const id = Number(props.params.id);
  const customer = await getCustomer(id);

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Customer Form - Server Only</h1>
      <form
        action={async (data) => {
          'use server';
          const error = await updateCustomer(data);
          formErrors = error?.flatten().fieldErrors;
        }}
      >
        <input type="hidden" name="id" value={customer?.id} />
        <div className="form-control w-full max-w-xs">
          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="input input-bordered w-full max-w-xs"
            defaultValue={customer?.firstName}
          />
          {formErrors?.firstName && <p className="mt-2 text-xs italic text-red-500"> {formErrors.firstName[0]}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="input input-bordered w-full max-w-xs"
            defaultValue={customer?.lastName}
          />
          {formErrors?.lastName && <p className="mt-2 text-xs italic text-red-500"> {formErrors.lastName[0]}</p>}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">Email</label>
          <input
            type="text"
            name="email"
            className="input input-bordered w-full max-w-xs"
            defaultValue={customer?.email}
          />
          {formErrors?.email && <p className="mt-2 text-xs italic text-red-500"> {formErrors.email[0]}</p>}
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Submit
        </button>
      </form>

      <div className="mt-5">
        <Link className="underline" href="/customers">
          Go Back
        </Link>
      </div>
    </>
  );
}
