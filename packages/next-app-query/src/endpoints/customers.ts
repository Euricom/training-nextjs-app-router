import { FormValues } from '@/app/customers/[id]/formSchema';
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

export const getCustomers = async (sortBy: string) => {
  const data = await api.get<CustomerDTO[]>(`/api/customers?sortBy=${sortBy}`);
  return data.map(mapCustomer);
};

export const getCustomer = async (id: number | string) => {
  const data = await api.get<CustomerDTO>(`/api/customers/${id}`);
  return mapCustomer(data);
};

export type CustomerUpdateDTO = {
  lastName?: string;
  firstName?: string;
  email?: string;
};

export const saveCustomer = async (input: { customerId: number; values: CustomerUpdateDTO }) => {
  return api.put(`/api/customers/${input.customerId}`, input.values);
};
