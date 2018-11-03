import {
  ActionReducerMap,
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CoreState, coreReducer } from './core/core.reducer';
import * as fromEmployee from './employees/employees.reducer';

export interface AppState {
  employees: fromEmployee.EmployeesState;
  core: CoreState;
}

export const reducers: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeesReducer,
  core: coreReducer
};

// Core selectors
export const selectCountries = createSelector(
  (state: AppState) => state.core,
  (state: CoreState) => state.countries
);

// Employees Selectors
export const selectEmployeesState = createFeatureSelector<fromEmployee.EmployeesState>('employees');

export const selectUserIds = createSelector(
  selectEmployeesState,
  fromEmployee.selectEmployeesIds
);

export const selectAllEmployees = createSelector(
  selectEmployeesState,
  fromEmployee.selectAllEmployees
);

export const selectCRUState = createSelector(
  selectEmployeesState,
  (empState: fromEmployee.EmployeesState) => empState.CRUState
);

export const selectCRUEmployee = createSelector(
  selectEmployeesState,
  (empState: fromEmployee.EmployeesState) => empState.CRUEmployee
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
