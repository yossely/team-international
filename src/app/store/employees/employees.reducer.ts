import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../../employees/shared/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employees.actions';
import { CRU_STATE } from '../../shared/models/cru-states.enum';

const employeeAdapter = createEntityAdapter<Employee>();

export interface EmployeesState extends EntityState<Employee> {
  CRUState?: CRU_STATE;
  CRUEmployee?: Employee;
}

export const initialState: EmployeesState = employeeAdapter.getInitialState();

export function employeesReducer(state = initialState, action: EmployeeActions): EmployeesState {
  switch (action.type) {
    case EmployeeActionTypes.AddEmployee: {
      return employeeAdapter.addOne(action.payload, state);
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

// Selectors
const { selectAll, selectIds } = employeeAdapter.getSelectors();

export const selectAllEmployees = selectAll;

// select the array of employees ids
export const selectEmployeesIds = selectIds;
