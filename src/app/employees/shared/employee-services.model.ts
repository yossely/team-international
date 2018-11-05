import { Employee } from './employee.model';
import { AREA } from './job.model';

export interface EmployeeService {
  area: AREA.SERVICES;
  tipRate?: number;
}

export class EmployeeService extends Employee {
  constructor(emp: EmployeeService) {
    super(emp);
  }
}
