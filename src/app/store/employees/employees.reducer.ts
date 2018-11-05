import { Employee } from '../../employees/shared/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employees.actions';
import { Country } from 'src/app/shared/models/country.model';
import { AREA } from 'src/app/employees/shared/job.model';

export interface EmployeesState {
  employees: { [id: string]: Employee };
}

export const initialState: EmployeesState = {
  employees: {
    'b1bfaaa0-e0b9-11e8-912f-190af83d9ebe': new Employee({
      name: 'Woompy',
      birthDate: new Date('2000-11-02T05:00:00.000Z'),
      country: {
        name: 'Albania',
      } as Country,
      username: 'DiegoJ',
      hireDate: new Date('2018-11-06T05:00:00.000Z'),
      status: true,
      area: AREA.SERVICES,
      jobTitle: 'Tuttofare',
      id: 'b1bfaaa0-e0b9-11e8-912f-190af83d9ebe'
    } as Employee)
  }
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
