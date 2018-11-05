import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import {
  AppState,
  getSelectedEmployee,
  selectCountries,
  selectLoadingCountries,
  selectErrorLoadingCountries
} from '../../store';
import { LoadCountries } from '../../store/core/core.actions';

import { Country } from '../../shared/models/country.model';
import { Employee } from '../shared/employee.model';
import { Job, availableJobs, AREA } from '../shared/job.model';
import { CRU_STATE } from '../../shared/models/cru-states.enum';
import { EmployeeService } from '../shared/employee-services.model';
import { EmployeeKitchen } from '../shared/employee-kitchen.model';
import { AddEmployee, UpdateEmployee, CRUEmployeeModel } from '../../store/employees/employees.actions';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  eighteenYearsBeforeToday: Date;

  employeeForm: FormGroup;

  countries$: Observable<Country[]>;
  loadingCountries$: Observable<boolean>;
  errorLoadingCountries$: Observable<boolean>;

  jobs: Job[];
  currentJobTitles: string[];

  employee: Employee;
  disableFields = false;
  currentCRUState: CRU_STATE;
  cruStates = CRU_STATE;

  employeeSubs: Subscription;

  cruState$: Observable<CRU_STATE>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loadingCountries$ = this.store.pipe(select(selectLoadingCountries));
    this.errorLoadingCountries$ = this.store.pipe(select(selectErrorLoadingCountries));

    // Rest 18 years to today
    this.eighteenYearsBeforeToday = new Date();
    this.eighteenYearsBeforeToday.setFullYear(this.eighteenYearsBeforeToday.getFullYear() - 18);

    this.jobs = availableJobs;

    this.employeeSubs = this.store.pipe(select(getSelectedEmployee)).subscribe((cruState: CRUEmployeeModel) => {
      this.employee = cruState.employee;

      this.currentCRUState = cruState.action;
      this.disableFields = this.currentCRUState === CRU_STATE.Read;

      this.employeeForm = this.fb.group({
        name: new FormControl({
          value: this.employee.name,
          disabled: this.disableFields
        }, { validators: Validators.required }),
        birthDate: new FormControl({
          value: this.employee.birthDate,
          disabled: this.disableFields
        }, { validators: Validators.required }),
        country: new FormControl({
          value: this.employee.country,
          disabled: this.disableFields
        }),
        username: new FormControl({
          value: this.employee.username,
          disabled: this.disableFields
        }, { validators: [Validators.required, Validators.pattern(/^[\w]+$/)] }),
        hireDate: new FormControl({
          value: this.employee.hireDate,
          disabled: this.disableFields
        }, { validators: Validators.required }),
        status: new FormControl({
          value: this.employee.status,
          disabled: this.disableFields
        }, { validators: Validators.required }),
        area: new FormControl({
          value: this.employee.area,
          disabled: this.disableFields
        }, { validators: Validators.required }),
      });
    });

    this.loadCountries();
    this.countries$ = this.store.pipe(select(selectCountries));
  }

  ngOnInit() {
  }

  compareCountry(countryOpt: Country, countrySelected: Country) {
    return countrySelected ? countryOpt.name === countrySelected.name : false;
  }

  loadCountries() {
    this.store.dispatch(new LoadCountries());
  }

  saveUpdateEmployee() {
    const newEmployeeRaw = this.employeeForm.getRawValue();
    let newEmployee: Employee;

    if (newEmployeeRaw.area === AREA.SERVICES) {
      newEmployee = new EmployeeService(newEmployeeRaw);
    } else {
      newEmployee = new EmployeeKitchen(newEmployeeRaw);
    }

    if (this.currentCRUState === CRU_STATE.Create) {
      this.store.dispatch(new AddEmployee(newEmployee));
    } else {
      newEmployee.id = this.employee.id;
      this.store.dispatch(new UpdateEmployee(newEmployee));
    }

    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.employeeSubs.unsubscribe();
  }

}
