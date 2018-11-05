import { Country } from '../../shared/models/country.model';

import * as uuidv1 from 'uuid/v1';

import { BasicModel } from '../../shared/utils/basic-model.model';
import { AREA } from './job.model';

export interface Employee {
  id: string;
  name: string;
  birthDate: Date;
  country: Country;
  username: string;
  hireDate: Date;
  /**
   * Employee's status
   *
   * true - active
   * false - inactive
   */
  status: boolean;
  area: AREA;
  jobTitle: string;
}

export class Employee extends BasicModel<Employee> {
  constructor(emp?: Employee) {
    super(emp);
    // Defaults
    this.id = this.id ? this.id : uuidv1();
    this.area = this.area ? this.area : AREA.SERVICES;
    this.status = this.status !== undefined ? this.status : true;
  }

  get age(): number {
    const timeDiff = Math.abs(new Date().getTime() - this.birthDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Transform the days on years
    return Math.trunc(diffDays / 365);
  }
}
