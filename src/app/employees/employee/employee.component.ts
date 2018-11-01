import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  maxDate = new Date();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
  }

}
