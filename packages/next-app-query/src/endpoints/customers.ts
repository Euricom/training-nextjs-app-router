import { api } from '@/utils/api/client';

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
  const data = await api.get<CustomerDTO[]>('/api/customers');
  return data.map(mapCustomer);
};

export const getCustomer = async (id: number | string) => {
  const data = await api.get<CustomerDTO>(`/api/customers/${id}`);
  return mapCustomer(data);
};

export type CustomerUpdateDTO = {
  id: number;
  lastName?: string;
  firstName?: string;
  email?: string;
};

export const saveCustomer = async (inputs: CustomerUpdateDTO & { id: number }) => {
  return api.put(`/api/customers/${inputs.id}`, inputs);
};
