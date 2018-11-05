import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import { AppState, getSelectedEmployee } from 'src/app/store';
import { CRUEmployeeModel } from '../../../store/employees/employees.actions';

@Injectable({
  providedIn: 'root'
})
export class EnterFormGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    let employeeExists: boolean;

    return this.store.pipe(
      select(getSelectedEmployee),
      map((cruState: CRUEmployeeModel) => !!cruState.employee),
      tap(e => employeeExists = e),
      finalize(() => {
        if (!employeeExists) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
