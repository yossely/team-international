import { Employee } from '../../employees/shared/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employees.actions';

export interface EmployeesState {
  employees: { [id: string]: Employee };
}

export const initialState: EmployeesState = {
  employees: {}
};

export function employeesReducer(state = initialState, action: EmployeeActions): EmployeesState {
  switch (action.type) {
    case EmployeeActionTypes.AddEmployee:
    case EmployeeActionTypes.UpdateEmployee:
      {
        return {
          ...state,
          employees: {
            ...state.employees,
            [action.payload.id]: action.payload
          }
        };
      }

    case EmployeeActionTypes.DeleteEmployee: {
      const employee = action.payload;
      const { [employee.id]: removed, ...employees } = state.employees;

      return {
        ...state,
        employees,
      };
    }

    default:
      return state;
  }
}
