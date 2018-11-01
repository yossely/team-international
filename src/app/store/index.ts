import {
  ActionReducerMap,
  MetaReducer,
  createSelector
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { employeesReducer, EmployeesState } from './employees/employees.reducer';
import { CoreState, coreReducer } from './core/core.reducer';

export interface AppState {
  employees: EmployeesState;
  core: CoreState;
}

export const reducers: ActionReducerMap<AppState> = {
  employees: employeesReducer,
  core: coreReducer
};

// Core selectors
export const selectCountries = createSelector(
  (state: AppState) => state.core,
  (state: CoreState) => state.countries
);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
