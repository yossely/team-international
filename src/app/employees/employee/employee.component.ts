import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState, selectCountries, getSelectedEmployee } from '../../store';
import { LoadCountries } from '../../store/core/core.actions';

import { Country } from '../../shared/models/country.model';
import { AREA, availableJobs, Job, Employee } from '../shared/employee.model';
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

  jobs: Job[];
  currentJobTitles: string[];

  private employee: Employee;
  currentCRUState: CRU_STATE;
  cruStates = CRU_STATE;

  employeeSubs: Subscription;

  cruState$: Observable<CRU_STATE>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    // Rest 18 years to today
    this.eighteenYearsBeforeToday = new Date();
    this.eighteenYearsBeforeToday.setFullYear(this.eighteenYearsBeforeToday.getFullYear() - 18);

    this.jobs = availableJobs;

    this.employeeSubs = this.store.pipe(select(getSelectedEmployee)).subscribe((cruState: CRUEmployeeModel) => {
      this.employee = cruState.employee;
      this.setCurrentJobTitles(this.employee.area);

      this.currentCRUState = cruState.action;
      const disableFields = this.currentCRUState === CRU_STATE.Read;

      this.employeeForm = this.fb.group({
        name: new FormControl({
          value: this.employee.name,
          disabled: disableFields
        }, { validators: Validators.required }),
        birthDate: new FormControl({
          value: this.employee.birthDate,
          disabled: disableFields
        }, { validators: Validators.required }),
        country: new FormControl({
          value: this.employee.country,
          disabled: disableFields
        }),
        username: new FormControl({
          value: this.employee.username,
          disabled: disableFields
        }, { validators: [Validators.required, Validators.pattern(/^[\w]+$/)] }),
        hireDate: new FormControl({
          value: this.employee.hireDate,
          disabled: disableFields
        }, { validators: Validators.required }),
        status: new FormControl({
          value: this.employee.status,
          disabled: disableFields
        }, { validators: Validators.required }),
        area: new FormControl({
          value: this.employee.area,
          disabled: disableFields
        }, { validators: Validators.required }),
        jobTitle: new FormControl({
          value: this.employee.jobTitle,
          disabled: disableFields
        }, { validators: Validators.required }),
      });

      // Update job titles options when area change
      this.employeeForm.get('area').valueChanges.subscribe(v => {
        this.employeeForm.get('jobTitle').setValue(undefined);
        this.setCurrentJobTitles(v);
      });

      // Set tip rate form control when setting up the form group
      if (this.employee.jobTitle &&
        (this.employee.jobTitle === 'Waitress' || this.employee.jobTitle === 'Dinning Room Manager')) {
        this.addTipRateFormControl((this.employee as EmployeeService).tipRate);
      }

      // Update tip rate form control when job title change
      this.employeeForm.get('jobTitle').valueChanges.subscribe(jt => {
        if (jt === 'Waitress' || jt === 'Dinning Room Manager') {
          this.addTipRateFormControl();
        } else {
          this.employeeForm.removeControl('tipRate');
        }
      });
    });

    this.store.dispatch(new LoadCountries());
    this.countries$ = this.store.pipe(select(selectCountries));
  }

  ngOnInit() {
  }

  compareCountry(countryOpt: Country, countrySelected: Country) {
    return countrySelected ? countryOpt.name === countrySelected.name : false;
  }

  private addTipRateFormControl(tipRate: number = 0) {
    this.employeeForm.addControl('tipRate', new FormControl({
      value: tipRate,
      disabled: this.currentCRUState === CRU_STATE.Read
    }, { validators: [Validators.required, Validators.min(1)] }));
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

  private setCurrentJobTitles(area: AREA) {
    this.currentJobTitles = this.jobs
      .filter(j => j.area === area)
      .map(j => j.jobTitles)[0];
  }

  ngOnDestroy() {
    this.employeeSubs.unsubscribe();
  }

}
