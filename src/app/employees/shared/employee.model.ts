import { Country } from '../../shared/models/country.model';
import { BasicModel } from '../../shared/utils/basic-model.model';

import * as uuidv1 from 'uuid/v1';

export enum STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum AREA {
  SERVICES = 'Services',
  KITCHEN = 'Kitchen'
}

export interface Job {
  area: AREA;
  jobTitles: string[];
}

export const availableJobs: Job[] = [
  {
    area: AREA.SERVICES,
    jobTitles: [
      'Manager',
      'Host',
      'Tuttofare',
      'Waitress',
      'Dinning Room Manager',
    ]
  },
  {
    area: AREA.KITCHEN,
    jobTitles: [
      'Chef',
      'Sous Chef',
      'Dishwasher',
      'Cook',
    ]
  }
];

export interface Employee {
  id: string;
  name: string;
  birthDate: Date;
  country: Country;
  username: string;
  hireDate: Date;
  status: STATUS;
  area: AREA;
  jobTitle: string;
}

export class Employee extends BasicModel<Employee> {
  constructor(emp: Employee) {
    super(emp);
    this.id = uuidv1();
  }

  get age(): number {
    const timeDiff = Math.abs(new Date().getTime() - this.birthDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Transform the days on years
    return Math.trunc(diffDays / 365);
  }
}
