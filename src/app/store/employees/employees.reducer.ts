import { Employee } from '../../employees/shared/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employees.actions';
import { CRU_STATE } from '../../shared/models/cru-states.enum';

export interface EmployeesState {
  employees: Employee[];
  CRUState?: CRU_STATE;
  CRUEmployee?: Employee;
}

export const initialState: EmployeesState = {
  employees: []
};

export function employeesReducer(state = initialState, action: EmployeeActions): EmployeesState {
  switch (action.type) {
    case EmployeeActionTypes.AddEmployee: {
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    }

    case EmployeeActionTypes.UpdateEmployee: {
      let emp: Employee[] = [...state.employees];
      const newEmp: Employee = action.payload;
      emp = emp.map(e => e.id === newEmp.id ? newEmp : e);

      return {
        ...state,
        employees: emp
      };
    }

    case EmployeeActionTypes.DeleteEmployee: {
      let emp: Employee[] = [...state.employees];
      const empToDelete: Employee = action.payload;
      emp = emp.filter(e => e.id !== empToDelete.id);

      return {
        ...state,
        employees: emp
      };
    }

    case EmployeeActionTypes.CRUEmployee: {
      return {
        ...state,
        CRUState: action.payload.CRUState,
        CRUEmployee: action.payload.CRUEmployee,
      };
    }

    default:
      return state;
  }
}
