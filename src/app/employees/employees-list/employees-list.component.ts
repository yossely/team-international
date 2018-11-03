import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

import { EmployeesListDataSource } from './employees-list-datasource';
import { Employee, STATUS, AREA, JOB_TITLE_KITCHEN } from '../shared/employee.model';
import { AddEmployee } from '../../store/employees/employees.actions';
import { EmployeeKitchen } from '../shared/employee-kitchen.model';

import * as uuidv1 from 'uuid/v1';

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

    // Test add one employee
    this.store.dispatch(new AddEmployee(new EmployeeKitchen({
      id: uuidv1(),
      name: 'a juliao',
      birthDate: new Date(2012, 8, 22),
      username: 'b',
      hireDate: new Date(),
      status: STATUS.ACTIVE,
      area: AREA.KITCHEN,
      jobTitle: JOB_TITLE_KITCHEN.CHEF,
      tipRate: .23
    } as EmployeeKitchen)));
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
