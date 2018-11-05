import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { InputSearchModule } from 'ngx-input-search';
import { SharedModule } from '../shared/shared.module';
import { JobTitleComponent } from './employee/job-title/job-title.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    SharedModule,
    InputSearchModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
  ],
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    EmployeeComponent,
    JobTitleComponent,
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class EmployeesModule { }
