import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { AppState, selectCountries } from '../../store';
import { LoadCountries } from '../../store/core/core.actions';
import { Observable } from 'rxjs';
import { Country } from '../../shared/models/country.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  today = new Date();

  employeeForm: FormGroup;

  countries$: Observable<Country[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
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

    this.store.dispatch(new LoadCountries());
    this.countries$ = this.store.pipe(select(selectCountries));
  }

}
