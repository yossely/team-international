import { JOB_TITLE_KITCHEN, Employee, AREA } from './employee.model';

export interface EmployeeKitchen {
  area: AREA.KITCHEN;
  jobTitle: JOB_TITLE_KITCHEN;
  tipRate?: number;
}

export class EmployeeKitchen extends Employee {
  constructor(emp: EmployeeKitchen) {
    super(emp);
  }
}
