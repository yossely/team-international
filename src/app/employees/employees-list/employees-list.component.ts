import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

import { EmployeesListDataSource } from './employees-list-datasource';
import { Employee } from '../shared/employee.model';

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
    console.log('edit employee', emp.name);
  }

  deleteEmployee(emp: Employee) {
    console.log('delete employee', emp.name);
  }

  viewEmployee(emp: Employee) {
    console.log('view employee', emp.name);
  }
}
