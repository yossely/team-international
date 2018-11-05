
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
