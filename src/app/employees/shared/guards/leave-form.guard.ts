import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeComponent } from '../../employee/employee.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormGuard implements CanDeactivate<EmployeeComponent> {
  constructor(private dialog: MatDialog) { }

  canDeactivate(
    component: EmployeeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    if (component.canDeactivate()) {
      return true;
    } else {
      // Open the confirmation dialog
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        data: {
          title: 'Are you sure?',
          body: `You have changes that are going to be lost`,
          cancelButton: 'KEEP EDITING',
          confirmButton: 'LEAVE'
        }
      });

      return dialogRef.afterClosed().pipe(
        map(confirmDeletion => !!confirmDeletion)
      );
    }
  }
}
