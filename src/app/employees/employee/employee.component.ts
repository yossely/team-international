import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState, selectCountries, selectCRUState, selectCRUEmployee } from '../../store';
import { LoadCountries } from '../../store/core/core.actions';
import { Country } from '../../shared/models/country.model';
import { JOB_TITLE_SERVICES, JOB_TITLE_KITCHEN, Employee } from '../shared/employee.model';
import { CRU_STATE } from '../../shared/models/cru-states.enum';

interface JobTitles<T> {
  key: string;
  value: T;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  today = new Date();

  employeeForm: FormGroup;

  countries$: Observable<Country[]>;

  areas: {
    services: Array<JobTitles<JOB_TITLE_SERVICES>>,
    kitchen: Array<JobTitles<JOB_TITLE_KITCHEN>>,
  };

  cruStates = CRU_STATE;
  employee: Employee;
  cruState: Observable<CRU_STATE>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    const enumToArray = <T>(enumToConvert: T) => {
      return Object.keys(enumToConvert).map((key) => {
        return {
          key: key as keyof T,
          value: enumToConvert[key]
        };
      });
    };

    this.areas = {
      services: enumToArray(JOB_TITLE_SERVICES),
      kitchen: enumToArray(JOB_TITLE_KITCHEN)
    };
  }

  ngOnInit() {
    this.cruState = this.store.pipe(select(selectCRUState));
    this.store.pipe(select(selectCRUEmployee)).subscribe((e) => {
      this.employee = e;

      this.employeeForm = this.fb.group({
        name: new FormControl(),
        birthDate: new FormControl(),
        country: new FormControl(),
        username: new FormControl(),
        hireDate: new FormControl(),
        status: new FormControl(),
        area: new FormControl(),
        jobTitle: new FormControl(),
        tipRate: new FormControl()
      });
    });

    this.store.dispatch(new LoadCountries());
    this.countries$ = this.store.pipe(select(selectCountries));
  }

}
