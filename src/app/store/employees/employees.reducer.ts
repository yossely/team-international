import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../../employees/shared/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employees.actions';


const employeeAdapter = createEntityAdapter<Employee>();

export interface EmployeesState extends EntityState<Employee> { }

// TODO: define adittional property to set current employee
export const initialState: EmployeesState = employeeAdapter.getInitialState();

export function employeesReducer(state = initialState, action: EmployeeActions): EmployeesState {
  switch (action.type) {
    case EmployeeActionTypes.AddEmployee: {
      return employeeAdapter.addOne(action.payload, state);
    }

    default:
      return state;
  }
}

// Selectors
const { selectAll, selectIds } = employeeAdapter.getSelectors();

export const selectAllEmployees = selectAll;

// select the array of employees ids
export const selectEmployeesIds = selectIds;
