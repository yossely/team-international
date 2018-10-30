import { Action } from '@ngrx/store';

export interface EmployeesState {
  employees: any[];
}

export const initialState: EmployeesState = {
  employees: []
};

export function employeesReducer(state = initialState, action: Action): EmployeesState {
  switch (action.type) {

    default:
      return state;
  }
}
