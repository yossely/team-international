import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { CRUEmployee } from '../store/employees/employees.actions';

import { Employee, AREA, STATUS } from './shared/employee.model';
import { CRU_STATE } from '../shared/models/cru-states.enum';

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
        CRUState: CRU_STATE.Create,
        CRUEmployee: new Employee({
          name: 'Woompy',
          birthDate: new Date(),
          username: 'joao',
          hireDate: new Date(),
          area: AREA.KITCHEN,
          jobTitle: 'Chef',
          status: STATUS.INACTIVE
        } as Employee)
      }
    ));
  }

}
