import { api } from '../utils/api/client';

// These can be auto generated where there is a
// open API (swagger) available

export type CustomerDTO = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export type Customer = CustomerDTO & {
  // noop
};

const mapCustomer = (source: CustomerDTO): Customer => {
  return {
    ...source,
  };
};

export const getCustomers = async () => {
  const data: CustomerDTO[] = await api.get<CustomerDTO[]>('api/customers');
  return data.map(mapCustomer);
};
