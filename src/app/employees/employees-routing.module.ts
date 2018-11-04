import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: 'employee/new',
    component: EmployeeComponent
  },
  {
    path: 'employee/edit/:employeeId',
    component: EmployeeComponent
  },
  {
    path: 'employee/view/:employeeId',
    component: EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
