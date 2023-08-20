import api from './root';

// This type can be auto generated where there is a
// open API (swagger) available

export type EmployeeDTO = {
  id: number;
  lastName: string;
  firstName: string;
  title: string;
  reportsTo: string;
  birthDate: string;
  hireDate: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  fax: string;
  email: string;
};

export type Employee = Omit<EmployeeDTO, 'birthDate' | 'hireDate'> & {
  birthDate: Date;
  hireDate: Date;
};

const mapEmployee = (employee: EmployeeDTO): Employee => {
  return {
    ...employee,
    birthDate: new Date(employee.birthDate),
    hireDate: new Date(employee.hireDate),
  };
};

export const getEmployees = async () => {
  const data = await api.get<EmployeeDTO[]>('api/employees', {
    // next: { revalidate: 10 },
  });
  return data.map(mapEmployee);
};
