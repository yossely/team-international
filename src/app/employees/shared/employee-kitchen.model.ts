import { Employee, AREA } from './employee.model';

export interface EmployeeKitchen {
  area: AREA.KITCHEN;
  tipRate?: number;
}

export class EmployeeKitchen extends Employee {
  constructor(emp: EmployeeKitchen) {
    super(emp);
  }
}
