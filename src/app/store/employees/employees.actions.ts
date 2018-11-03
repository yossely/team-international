import { Action } from '@ngrx/store';
import { Employee } from '../../employees/shared/employee.model';
import { CRU_STATE } from '../../shared/models/cru-states.enum';

export enum EmployeeActionTypes {
  AddEmployee = '[Employee] Add Employee',
  CRUEmployee = '[Employee] Create Read or Update an Employee',
}

export interface CRUEmployeePayloadModel {
  CRUState: CRU_STATE;
  CRUEmployee: Employee;
}

export class AddEmployee implements Action {
  readonly type = EmployeeActionTypes.AddEmployee;

  constructor(public payload: Employee) { }
}

export class CRUEmployee implements Action {
  readonly type = EmployeeActionTypes.CRUEmployee;

  constructor(public payload: CRUEmployeePayloadModel) { }
}

export type EmployeeActions = AddEmployee | CRUEmployee;
