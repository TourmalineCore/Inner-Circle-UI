/* eslint-disable no-extra-boolean-cast */
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Input, CheckField, Button } from '@tourmalinecore/react-tc-ui-kit';
import { NumberFormatValues } from 'react-number-format';

import { ReactComponent as IconProfile } from '../../../../assets/icons/profile.svg';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import { Employee } from '../../types';

import CustomDatePicker from './components/CustomDatePicker/CustomDatePicker';
import CustomNumberFormat from './components/CustomNumberFormat/CustomNumberFormat';
import CustomPatternFormat from './components/CustomPatternFormat/CustomPatternFormat';

const employeeStatusData = {
  current: 'Current/Active',
  fired: 'Fired',
};

const employeeTypeData = {
  1: 'Full time',
  0.5: 'Half time',
};

const employedData = {
  officially: 'Officially',
  unofficially: 'Unofficially',
};

function EmployeeEdit() {
  const navigate = useNavigate();

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [employee, setEmployee] = useState<Employee>({
    fullName: '',
    corporateEmail: '',
    personalEmail: null,
    phone: null,
    gitHub: null,
    gitLab: null,
    ratePerHour: 0,
    fullSalary: null,
    employmentType: 0,
    parking: 0,
    hireDate: null,
    dismissalDate: new Date(),
    isEmployedOfficially: true,
    isFired: false,
    personnelNumber: '',
  });

  const [param] = useSearchParams();
  const id = param.get('id');

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedForm: Employee = {
      ...employee,
      [name]: value,
    };

    setEmployee(updatedForm);
  };

  return (
    <section className="employee-edit">
      <h1>Employee Profile</h1>
      <div className="employee-edit__info">
        <span className="employee-edit__icon"><IconProfile /></span>
        {employee.fullName}
      </div>
      <div className="employee-edit__info">
        <span className="employee-edit__icon"><IconProfile /></span>
        {employee.corporateEmail}
      </div>

      <h2>Contacts</h2>
      <ul>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Phone Number*</span>
          <CustomPatternFormat
            className="employee-edit__control"
            type="tel"
            format="+7 (###) ### ## ##"
            value={employee.phone}
            isInvalid={!(employee.phone && employee.phone.length > 9) && triedToSubmit}
            onChange={(event: NumberFormatValues) => setEmployee({ ...employee, phone: event.value })}
          />
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Personal Email</span>
          <Input
            name="personalEmail"
            placeholder="email@mail.ru"
            className="employee-edit__control"
            value={employee.personalEmail || ''}
            onChange={handleFormChange}
          />
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Personal GitHub</span>
          <div className="employee-edit__git employee-edit__control">
            <span className="employee-edit__symbol">@</span>
            <Input
              className="employee-edit__control"
              name="gitHub"
              value={employee.gitHub || ''}
              onChange={handleFormChange}
            />
          </div>
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Personal GitLab</span>
          <div className="employee-edit__git employee-edit__control">
            <span className="employee-edit__symbol">@</span>
            <Input
              className="employee-edit__control"
              name="gitLab"
              value={employee.gitLab || ''}
              onChange={handleFormChange}
            />
          </div>
        </li>
      </ul>

      <h2>Salary</h2>
      <ul>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Rate Per Hour *</span>
          <div className="employee-edit__control">
            <CustomNumberFormat
              value={employee.ratePerHour || 0}
              isInvalid={!(employee.ratePerHour! >= 0) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({ ...employee, ratePerHour: Number(event.value) })}
            />
          </div>
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Full Salary *</span>
          <div className="employee-edit__control">
            <CustomNumberFormat
              value={employee.fullSalary || ''}
              isInvalid={!Boolean(employee.fullSalary) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({ ...employee, fullSalary: Number(event.value) })}
            />
          </div>
        </li>
        <li className="employee-edit__item employee-edit__item--radio-list">
          <span className="employee-edit__label">Employment Type *</span>
          <div className="employee-edit__control">
            {Object.entries(employeeTypeData).map(([value, label]) => (
              <CheckField
                key={value}
                style={{
                  marginBottom: 16,
                }}
                viewType="radio"
                label={label}
                checked={value === String(employee.employmentType)}
                onChange={() => setEmployee({ ...employee, employmentType: Number(value) })}
              />
            ))}
          </div>
        </li>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Parking *</span>
          <div className="employee-edit__control">
            <CustomNumberFormat
              value={employee.parking || 0}
              isInvalid={!(employee.parking! >= 0) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({ ...employee, parking: Number(event.value) })}
            />
          </div>
        </li>
      </ul>

      <h2>Documents</h2>
      <ul>
        <li className="employee-edit__item">
          <span className="employee-edit__label">Hire Date *</span>
          <div className="employee-edit__control">
            <CustomDatePicker
              date={employee.hireDate}
              isInvalid={!Boolean(employee.hireDate) && triedToSubmit}
              onChange={(date: Date) => setEmployee({ ...employee, hireDate: date })}
            />
          </div>
        </li>
        <li className="employee-edit__item employee-edit__item--radio-list">
          <span className="employee-edit__label">Employee Status *</span>
          <div>
            {Object.entries(employeeStatusData).map(([value, label]) => {
              const valueEmployedFired = employee.isFired ? 'fired' : 'current';

              return (
                <CheckField
                  key={value}
                  style={{
                    marginBottom: 16,
                  }}
                  viewType="radio"
                  label={label}
                  checked={value === valueEmployedFired}
                  onChange={() => setEmployee({ ...employee, isFired: value === 'fired' })}
                />
              );
            })}
          </div>
        </li>
        {employee.isFired && (
          <li className="employee-edit__item">
            <span className="employee-edit__label">Date of Dismissal *</span>
            <div className="employee-edit__control">
              <CustomDatePicker
                date={employee.dismissalDate}
                isInvalid={!Boolean(employee.dismissalDate) && triedToSubmit}
                onChange={(date: Date) => setEmployee({ ...employee, dismissalDate: date })}
              />
            </div>
          </li>
        )}
        <li className="employee-edit__item employee-edit__item--radio-list">
          <span className="employee-edit__label">Employed *</span>
          <div>
            {Object.entries(employedData).map(([value, label]) => {
              const valueEmployedOfficially = employee.isEmployedOfficially ? 'officially' : 'unofficially';

              return (
                <CheckField
                  key={value}
                  style={{
                    marginBottom: 16,
                  }}
                  viewType="radio"
                  label={label}
                  checked={value === valueEmployedOfficially}
                  onChange={() => setEmployee({ ...employee, isEmployedOfficially: value === 'officially' })}
                />
              );
            })}
          </div>
        </li>
        {employee.isEmployedOfficially && (
          <li className="employee-edit__item">
            <span className="employee-edit__label">Personnel Number *</span>
            <CustomPatternFormat
              className="employee-edit__control"
              format="##/##"
              value={employee.personnelNumber}
              isInvalid={!(employee.personnelNumber && employee.personnelNumber.length >= 4) && triedToSubmit}
              onChange={(event: NumberFormatValues) => setEmployee({ ...employee, personnelNumber: event.value })}
            />
          </li>
        )}
      </ul>

      <div className="employee-edit__box-buttons">
        <Button onClick={() => navigate('/employees')}>Cancel</Button>
        <Button onClick={() => updateEmployeesAsync()}>Save Changes</Button>
      </div>
    </section>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}employees/${id}`);

    const initialData = {
      ...data,
      phone: typeof data.phone === 'string' ? data.phone.split('').slice(2).join('') : data.phone,
      hireDate: typeof data.hireDate === 'string' ? new Date(data.hireDate) : data.hireDate,
      dismissalDate: typeof data.dismissalDate === 'string' ? new Date(data.dismissalDate) : data.dismissalDate,
    };

    setEmployee(initialData);
  }

  async function updateEmployeesAsync() {
    const updateEmployee = {
      ...employee,
      phone: `+7${employee.phone}`,
    };

    delete updateEmployee.isFired;
    delete updateEmployee.dismissalDate;

    setTriedToSubmit(true);

    try {
      await api.put<Employee>(`${LINK_TO_SALARY_SERVICE}employees/update`, updateEmployee);

      setTriedToSubmit(false);
      navigate('/employees');
    } catch {
      console.log('Error');
    }
  }
}

export default EmployeeEdit;