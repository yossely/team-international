import { Country } from '../../shared/models/country.model';
import { BasicModel } from '../../shared/utils/basic-model.model';

export enum STATUS {
  ACTIVE,
  INACTIVE
}

export enum AREA {
  SERVICES = 'Services',
  KITCHEN = 'Kitchen'
}

export enum JOB_TITLE_SERVICES {
  MANAGER = 'Manager',
  HOST = 'Host',
  TUTTOFARE = 'Tuttofare',
  WAITRESS = 'Waitress',
  DINNING_ROOM_MANAGER = 'Dinning Room Manager'
}

export enum JOB_TITLE_KITCHEN {
  CHEF = 'Chef',
  SOUS_CHEF = 'Sous Chef',
  DISHWASHER = 'Dishwasher',
  COOK = 'Cook',
}

export interface Employee {
  id: string;
  name: string;
  birthDate: Date;
  country: Country;
  username: string;
  hireDate: Date;
  status: STATUS;
  area: AREA;
  jobTitle: JOB_TITLE_SERVICES | JOB_TITLE_KITCHEN;
}

export class Employee extends BasicModel<Employee> {
  constructor(emp: Employee) {
    super(emp);
  }

  get age(): number {
    const timeDiff = Math.abs(new Date().getTime() - this.birthDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Transform the days on years
    return Math.trunc(diffDays / 365);
  }
}
