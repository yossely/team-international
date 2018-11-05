import { Employee } from './employee.model';
import { AREA } from './job.model';

export interface EmployeeKitchen {
  area: AREA.KITCHEN;
  tipRate?: number;
}

export class EmployeeKitchen extends Employee {
  constructor(emp: EmployeeKitchen) {
    super(emp);
  }
}
