import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
} from '@angular/material';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeComponent } from './employee/employee.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    EmployeeComponent],
  providers: [
    MatDatepickerModule
  ]
})
export class EmployeesModule { }
