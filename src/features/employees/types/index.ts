export type ColleagueContactsType = {
  id: number;
  fullName: string;
  corporateEmail: string;
  personalEmail: string;
  phone: string | null;
  gitHub: string | null;
  gitLab: string | null;
};
export type ColleagueFinancesDtoType = {
  id: number;
  fullName: string;
  ratePerHour: number;
  pay: number;
  employmentType: number;
  netSalary: number;
  parking: number;
};

export type ColleaguesType = {
  colleagueContacts : ColleagueContactsType[]
  colleagueFinancesDto: ColleagueFinancesDtoType[]
};

export type EmployeeType = {
  name: string,
  surname: string,
  middleName: string,
  corporateEmail: string,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  parkingCostPerMonth: number,
};

export type EmployeeContactUpdateType = {
  employeeId: number,
  name: string,
  surname: string,
  middleName: string,
  corporateEmail: string,
  personalEmail: string,
  phone: string | null,
  gitHub: string | null,
  gitLab: string | null
};

export type EmployeeSalaryUpdateType = {
  employeeId: number,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  parkingCostPerMonth: number
};

export enum EmployeeTypeSwitch {
  'Full Time' = 1,
  'Half Time' = 0.5,
}

export type Employees = {
  employeeId: number;
  fullName: string;
  corporateEmail: string;
  personalEmail: string | null;
  phone: string | null;
  gitHub: string | null;
  gitLab: string | null;
  netSalary: number | null;
  ratePerHour: number | null;
  fullSalary: number | null;
  employmentType: number;
  parking: number | null;
  personnelNumber: string | null;
  hireDate: string | null;
  isCurrentEmployee: boolean;
  isBlankEmployee: boolean;
};
