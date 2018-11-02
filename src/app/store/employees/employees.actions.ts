import { Action } from '@ngrx/store';
import { Employee } from '../../employees/shared/employee.model';

export enum EmployeeActionTypes {
  AddEmployee = '[Employee] Add Employee',
}

export class AddEmployee implements Action {
  readonly type = EmployeeActionTypes.AddEmployee;

  constructor(public payload: Employee) { }
}

export type EmployeeActions = AddEmployee;
