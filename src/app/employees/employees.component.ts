import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { CRUEmployee } from '../store/employees/employees.actions';

import { Employee } from './shared/employee.model';
import { CRU_STATE } from '../shared/models/cru-states.enum';

import * as uuidv1 from 'uuid/v1';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  createEmployee() {
    this.store.dispatch(new CRUEmployee(
      {
        CRUState: CRU_STATE.Create, CRUEmployee: new Employee({
          id: uuidv1()
        } as Employee)
      }
    ));
  }

}
