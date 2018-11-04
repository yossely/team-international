import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

import { EmployeesListDataSource } from './employees-list-datasource';
import { Employee } from '../shared/employee.model';
import { CRUEmployee } from '../../store/employees/employees.actions';
import { CRU_STATE } from '../../shared/models/cru-states.enum';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EmployeesListDataSource;

  /** Columns displayed in the table */
  displayedColumns = ['name', 'age', 'username', 'hireDate', 'actions'];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.dataSource = new EmployeesListDataSource(this.paginator, this.sort, this.store);
  }

  editEmployee(emp: Employee) {
    this.store.dispatch(new CRUEmployee({ CRUState: CRU_STATE.Update, CRUEmployee: emp }));
  }

  deleteEmployee(emp: Employee) {
    console.log('delete employee', emp.name);
  }

  viewEmployee(emp: Employee) {
    this.store.dispatch(new CRUEmployee({ CRUState: CRU_STATE.Read, CRUEmployee: emp }));
  }
}
