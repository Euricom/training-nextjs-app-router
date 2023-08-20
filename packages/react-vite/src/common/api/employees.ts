import { fetch } from '@/common/api/root';

export type EmployeeDTO = {
  id: number;
  lastName: string;
  firstName: string;
  title: string | null;
  reportsTo: number | null;
  birthDate: string | null; // <------ Date
  hireDate: string | null; // <------ Date
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
};

export const getEmployees = () => {
  return fetch<EmployeeDTO[]>('/employees');
};

export const getEmployee = (id: number | string) => {
  return fetch<EmployeeDTO>(`/employees/${id}`);
};
