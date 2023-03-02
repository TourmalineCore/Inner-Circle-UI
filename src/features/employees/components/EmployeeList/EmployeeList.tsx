import { observer } from 'mobx-react-lite';
import Skeleton from 'react-loading-skeleton';
import { Employee } from '../../types';
import EmployeeItem from './components/EmployeeItem';

function EmployeeList({
  isLoading,
  employees = [],
}: {
  isLoading: boolean;
  employees: Employee[];
}) {
  return (
    <ul className="employee-list">
      {isLoading && (<Skeleton className="employee-list__skeleton" count={4} />)}
      {employees.length <= 0 && (<li>List empty</li>)}
      {employees.length > 0 && employees.map((employee) => (
        <EmployeeItem key={employee.employeeId} employee={employee} />
      ))}
    </ul>
  );
}

export default observer(EmployeeList);
