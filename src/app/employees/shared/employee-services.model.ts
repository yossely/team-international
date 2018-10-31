import { AREA, JOB_TITLE_SERVICES, Employee } from './employee.model';

export interface EmployeeService {
  area: AREA.SERVICES;
  jobTitle: JOB_TITLE_SERVICES;
  tipRate?: number;
}

export class EmployeeService extends Employee {
  constructor(emp: EmployeeService) {
    super(emp);
  }
}
