import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState, selectCountries, selectCRUState, selectCRUEmployee } from '../../store';
import { LoadCountries } from '../../store/core/core.actions';

import { Country } from '../../shared/models/country.model';
import { Employee, AREA, availableJobs, Job } from '../shared/employee.model';
import { CRU_STATE } from '../../shared/models/cru-states.enum';
import { EmployeeService } from '../shared/employee-services.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  today = new Date();

  employeeForm: FormGroup;

  countries$: Observable<Country[]>;

  jobs: Job[];
  currentJobTitles: string[];

  cruStates = CRU_STATE;

  employee: Employee;
  employeeSubs: Subscription;

  cruState$: Observable<CRU_STATE>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.jobs = availableJobs;

    this.cruState$ = this.store.pipe(select(selectCRUState));

    this.employeeSubs = this.store.pipe(select(selectCRUEmployee)).subscribe((e: Employee) => {
      this.employee = e;
      this.setCurrentJobTitles(this.employee.area);

      this.employeeForm = this.fb.group({
        name: new FormControl({
          value: this.employee.name,
          disabled: false
        }, { validators: Validators.required }),
        birthDate: new FormControl({
          value: this.employee.birthDate,
          disabled: false
        }, { validators: Validators.required }),
        country: new FormControl({
          value: this.employee.country,
          disabled: false
        }),
        username: new FormControl({
          value: this.employee.username,
          disabled: false
        }, { validators: Validators.required }),
        hireDate: new FormControl({
          value: this.employee.hireDate,
          disabled: false
        }, { validators: Validators.required }),
        status: new FormControl({
          value: this.employee.status,
          disabled: false
        }, { validators: Validators.required }),
        area: new FormControl({
          value: this.employee.area,
          disabled: false
        }, { validators: Validators.required }),
        jobTitle: new FormControl({
          value: this.employee.jobTitle,
          disabled: false
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
      disabled: false
    }, { validators: [Validators.required, Validators.min(1)] }));
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
