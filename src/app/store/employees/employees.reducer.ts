import { Employee } from '../../employees/shared/employee.model';
import { EmployeeActions, EmployeeActionTypes } from './employees.actions';
import { Country } from 'src/app/shared/models/country.model';
import { AREA } from 'src/app/employees/shared/job.model';
import { EmployeeService } from 'src/app/employees/shared/employee-services.model';

export interface EmployeesState {
  employees: { [id: string]: Employee };
}

export const initialState: EmployeesState = {
  employees: {
    'b1bfaaa0-e0b9-11e8-912f-190af83d9ebe': new EmployeeService({
      name: 'Yossely',
      birthDate: new Date('1992-11-02T05:00:00.000Z'),
      country: {
        name: 'Albania',
      } as Country,
      username: 'yossely7',
      hireDate: new Date('2018-11-06T05:00:00.000Z'),
      status: true,
      area: AREA.SERVICES,
      jobTitle: 'Tuttofare',
      id: 'b1bfaaa0-e0b9-11e8-912f-190af83d9ebe'
    } as EmployeeService),
    'b1bfaaa0-e0b9-11e8-912f-190af83d9eb2': new EmployeeService({
      name: 'Woompy',
      birthDate: new Date('2000-11-02T05:00:00.000Z'),
      country: {
        name: 'Germany',
      } as Country,
      username: 'woompy',
      hireDate: new Date('2018-11-06T05:00:00.000Z'),
      status: true,
      area: AREA.SERVICES,
      jobTitle: 'Waitress',
      tipRate: 2,
      id: 'b1bfaaa0-e0b9-11e8-912f-190af83d9eb2'
    } as EmployeeService)
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
