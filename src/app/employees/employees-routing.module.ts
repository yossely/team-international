import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EnterFormGuard } from './shared/guards/enter-form.guard';

const routes: Routes = [
  {
    path: 'employee/new',
    component: EmployeeComponent,
    data: {
      title: 'New Employee',
    }
  },
  {
    path: 'employee/edit/:employeeId',
    component: EmployeeComponent,
    canActivate: [EnterFormGuard],
    data: {
      title: 'Edit Employee'
    }
  },
  {
    path: 'employee/view/:employeeId',
    component: EmployeeComponent,
    canActivate: [EnterFormGuard],
    data: {
      title: 'View Employee'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
