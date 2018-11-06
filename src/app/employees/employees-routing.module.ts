import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EnterFormGuard } from './shared/guards/enter-form.guard';
import { LeaveFormGuard } from './shared/guards/leave-form.guard';

const routes: Routes = [
  {
    path: 'employee/new',
    component: EmployeeComponent,
    canDeactivate: [LeaveFormGuard]
  },
  {
    path: 'employee/edit/:employeeId',
    component: EmployeeComponent,
    canActivate: [EnterFormGuard],
    canDeactivate: [LeaveFormGuard]
  },
  {
    path: 'employee/view/:employeeId',
    component: EmployeeComponent,
    canActivate: [EnterFormGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
