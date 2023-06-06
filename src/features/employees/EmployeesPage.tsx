import {
  useContext, useEffect, useMemo, useState,
} from 'react';

import { observer } from 'mobx-react-lite';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import SearchBar from './components/SearchBar/SearchBar';

import EmployeeList from './components/EmployeeList/EmployeeList';
import FilterMenu from './components/FilterMenu/FilterMenu';
import SortMenu from './components/SortMenu/SortMenu';
import EmployeesStateContext from './context/EmployeesStateContext';
import EmployeesState from './context/EmployeesState';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';
import { api } from '../../common/api';
import RoutesStateContext from '../../routes/state/RoutesStateContext';

function EmployeesPage() {
  const employeesState = useMemo(() => new EmployeesState(), []);
  const routesState = useContext(RoutesStateContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <EmployeesStateContext.Provider value={employeesState}>
      <ContentCard
        style={{ margin: 20 }}
        isStickyHead
        headerContent={(
          <DefaultCardHeader>Salary data</DefaultCardHeader>
        )}
      >

        <section className="employees-page">

          {employeesState.isBlankEmployees
          && routesState.accessPermissions.get('ViewSalaryAndDocumentsData')
          && <div className="employees-page__notification">You have blank employees. Please fill in their profiles.</div>}

          <h1>Employees</h1>

          <div className="employees-page__box">
            <div><SearchBar /></div>
            { routesState.accessPermissions.get('ViewSalaryAndDocumentsData') && <FilterMenu />}
            <SortMenu />
          </div>

          <div>
            <EmployeeList
              isLoading={isLoading}
              employees={employeesState.allEmployees}
            />
          </div>
        </section>
      </ContentCard>
    </EmployeesStateContext.Provider>
  );

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.get(`${LINK_TO_SALARY_SERVICE}employees/all `);

      employeesState.changeEmployees(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
}

export default observer(EmployeesPage);
