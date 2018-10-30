import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { employeesReducer, EmployeesState } from './employees/employees.reducer';

export interface State {
  employees: EmployeesState;
}

export const reducers: ActionReducerMap<State> = {
  employees: employeesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
