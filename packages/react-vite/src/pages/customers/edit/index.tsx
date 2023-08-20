import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import CustomerForm from './form';
import { getCustomer } from '@/common/api/customers';

type EditCustomerParams = {
  id: string;
};

const EditCustomer = () => {
  const { id } = useParams<EditCustomerParams>();
  const { data: customer } = useQuery(['customers', id], () => getCustomer(id!));

  return (
    <>
      {customer && <CustomerForm customer={customer} />}
      <div className="mt-5">
        <Link className="underline" to="/">
          Go Back
        </Link>
      </div>
    </>
  );
};

export default EditCustomer;
