import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialogRef, MatDialog, MatTableDataSource } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { AppState, selectAllEmployees } from 'src/app/store';

import { filter } from 'rxjs/operators';

import { Employee } from '../shared/employee.model';
import { DeleteEmployee } from '../../store/employees/employees.actions';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Employee>;

  /** Columns displayed in the table */
  displayedColumns = ['name', 'age', 'username', 'hireDate', 'actions'];

  /**
   * A reference of the current dialog present
   */
  private dialogRef: MatDialogRef<ConfirmationModalComponent>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {
    this.store.pipe(select(selectAllEmployees))
      .subscribe(e => {
        this.dataSource = new MatTableDataSource(e);
      });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterEmployees($event: Event) {
    const stringEmitted = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = stringEmitted.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(emp: Employee) {
    // Open the confirmation dialog
    this.dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Are you sure?',
        body: `Do you want to delete the employee ${emp.name}`,
        cancelButton: 'Cancel',
        confirmButton: 'Delete'
      }
    });

    this.dialogRef.afterClosed().pipe(
      filter(confirmDeletion => confirmDeletion)
    )
      .subscribe(() => {
        this.store.dispatch(new DeleteEmployee(emp));
      });
  }
}
