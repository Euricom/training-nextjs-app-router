import { fetch } from '@/common/api/root';

export type CustomerDTO = {
  id: number;
  firstName: string;
  lastName: string;
  company: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  phone: string | null;
  fax: string | null;
  email: string;
  supportRepId: number | null;
};

export const getAllCustomers = () => {
  return fetch<CustomerDTO[]>('/customers');
};

export const getCustomer = (id: number | string) => {
  return fetch<CustomerDTO>(`/customers/${id}`);
};

export type CustomerUpdateDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export const updateCustomer = (input: CustomerUpdateDTO) => {
  return fetch<CustomerDTO>(`/customers/${input.id}`, {
    method: 'PUT',
    body: input,
  });
};
