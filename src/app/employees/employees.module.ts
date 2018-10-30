import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  declarations: [EmployeesComponent, EmployeesListComponent]
})
export class EmployeesModule { }
