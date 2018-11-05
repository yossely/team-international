import { Component, OnInit, Input } from '@angular/core';
import { AREA, availableJobs } from '../../shared/job.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../shared/employee.model';
import { EmployeeService } from '../../shared/employee-services.model';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {

  @Input()
  set area(value: AREA) {
    this._area = value;
    this.setCurrentJobTitles();
  }
  get area() {
    return this._area;
  }
  private _area: AREA;

  @Input()
  set formGroupParent(fg: FormGroup) {
    this._formGroupParent = fg;
    this.setJobTitleFormControlOnParent();
  }
  get formGroupParent() {
    return this._formGroupParent;
  }
  private _formGroupParent: FormGroup;

  @Input()
  set employee(emp: Employee) {
    this._employee = emp;
    this.updateJobTitleTipRateValues();
  }
  get employee() {
    return this._employee;
  }
  private _employee: Employee;

  @Input()
  set disabled(disableFields: boolean) {
    this._disabled = disableFields;
    this.updateJobTitleTipRateDisabled();
  }
  get disabled() {
    return this._disabled;
  }
  private _disabled = false;

  currentJobTitles: string[];

  jobTitleFormControl: FormControl;
  tipRateFormControl: FormControl;

  constructor() {
    this.jobTitleFormControl = new FormControl({
      value: this.employee ? this.employee.jobTitle : null,
      disabled: this.disabled
    }, { validators: Validators.required });

    this.jobTitleFormControl.valueChanges.subscribe(jt => {
      if (jt === 'Waitress' || jt === 'Dinning Room Manager') {
        this.addTipRateFormControl();
      } else {
        if (this.formGroupParent) {
          this.formGroupParent.removeControl('tipRate');
        }
      }
    });
  }

  ngOnInit() {
  }

  private setJobTitleFormControlOnParent() {
    if (this.formGroupParent) {
      this.formGroupParent.addControl(
        'jobTitle',
        this.jobTitleFormControl
      );
    }
  }

  private setCurrentJobTitles() {
    this.jobTitleFormControl.setValue(undefined);
    this.currentJobTitles = availableJobs
      .filter(j => j.area === this.area)
      .map(j => j.jobTitles)[0];
  }

  private addTipRateFormControl() {
    this.tipRateFormControl = new FormControl({
      value: this.employee ?
        (this.employee as EmployeeService).tipRate : 0,
      disabled: this.disabled
    }, { validators: [Validators.required, Validators.min(0)] });

    this.formGroupParent.addControl(
      'tipRate',
      this.tipRateFormControl
    );
  }

  private updateJobTitleTipRateValues() {
    if (this.employee) {
      if (this.formGroupParent && this.formGroupParent.get('jobTitle')) {
        this.formGroupParent.get('jobTitle').setValue(this.employee.jobTitle);
      }
      if (this.formGroupParent && this.formGroupParent.get('tipRate')) {
        this.formGroupParent.get('tipRate').setValue((this.employee as EmployeeService).tipRate);
      }
    }
  }

  private updateJobTitleTipRateDisabled() {
    if (this.disabled) {
      if (this.formGroupParent && this.formGroupParent.get('jobTitle')) {
        this.formGroupParent.get('jobTitle').disable();
      }
      if (this.formGroupParent && this.formGroupParent.get('tipRate')) {
        this.formGroupParent.get('tipRate').disable();
      }
    }
  }
}
