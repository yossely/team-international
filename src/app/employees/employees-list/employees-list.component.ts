import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

import { EmployeesListDataSource } from './employees-list-datasource';
import { Employee } from '../shared/employee.model';
import { DeleteEmployee } from '../../store/employees/employees.actions';

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

  deleteEmployee(emp: Employee) {
    this.store.dispatch(new DeleteEmployee(emp));
  }
}
