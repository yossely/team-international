import { Country } from '../../shared/models/country.model';

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
  name: string;
  birthDate: Date;
  country: Country;
  username: string;
  hireDate: Date;
  status: STATUS;
  area: AREA;
  jobTitle: JOB_TITLE_SERVICES | JOB_TITLE_KITCHEN;
  tipRate?: number;
}

export class Employee {
  constructor(parameters) {
  }
}
