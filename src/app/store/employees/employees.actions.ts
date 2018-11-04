import { Action } from '@ngrx/store';

import { Employee } from '../../employees/shared/employee.model';
import { CRU_STATE } from '../../shared/models/cru-states.enum';

export enum EmployeeActionTypes {
  AddEmployee = '[Employee] Add Employee',
  UpdateEmployee = '[Employee] Update Employee',
  DeleteEmployee = '[Employee] Delete Employee',
}

export interface CRUEmployeeModel {
  action: CRU_STATE;
  employee: Employee;
}

export class AddEmployee implements Action {
  readonly type = EmployeeActionTypes.AddEmployee;

  constructor(public payload: Employee) { }
}

export class UpdateEmployee implements Action {
  readonly type = EmployeeActionTypes.UpdateEmployee;

  constructor(public payload: Employee) { }
}

export class DeleteEmployee implements Action {
  readonly type = EmployeeActionTypes.DeleteEmployee;

  constructor(public payload: Employee) { }
}

export type EmployeeActions = AddEmployee | UpdateEmployee | DeleteEmployee;
