// This type should come from the swagger definition of the API
// See https://www.npmjs.com/package/openapi-typescript

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

// remapped to handle Dates correctly
export type Employee = Omit<EmployeeDTO, 'birthDate' | 'hireDate'> & {
  birthDate: Date;
  hireDate: Date;
};
