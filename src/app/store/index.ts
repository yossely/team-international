import {
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import * as fromEmployee from './employees/employees.reducer';
import { CRUEmployeeModel } from './employees/employees.actions';
import { CRU_STATE } from '../shared/models/cru-states.enum';
import { CoreState, coreReducer } from './core/core.reducer';
import { Employee } from '../employees/shared/employee.model';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router/router.reducer';

export interface AppState {
  employees: fromEmployee.EmployeesState;
  core: CoreState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeesReducer,
  core: coreReducer,
  router: fromRouter.routerReducer,
};

// Router selectors
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('router');

// Core selectors
export const selectCountries = createSelector(
  (state: AppState) => state.core,
  (state: CoreState) => state.countries
);

// Employees Selectors
export const selectEmployeesState = createFeatureSelector<fromEmployee.EmployeesState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  (empState: fromEmployee.EmployeesState) => {
    return Object.keys(empState.employees).map(id => empState.employees[id]);
  }
);

export const selectEmployees = createSelector(
  selectEmployeesState,
  (empState: fromEmployee.EmployeesState) => empState.employees
);

export const getSelectedEmployee = createSelector(
  selectEmployees,
  getRouterState,
  (employees: { [id: string]: Employee; }, router: RouterReducerState<RouterStateUrl>): CRUEmployeeModel => {
    let action: CRU_STATE;
    let employee: Employee;

    if (router.state.url.includes('employee/edit')) {
      action = CRU_STATE.Update;
      employee = employees[router.state.params.employeeId];
    } else if (router.state.url.includes('employee/view')) {
      action = CRU_STATE.Read;
      employee = employees[router.state.params.employeeId];
    } else {
      action = CRU_STATE.Create;
      employee = new Employee();
    }

    return { action, employee };
  }
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
