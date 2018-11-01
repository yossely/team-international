import { Action } from '@ngrx/store';
import { Country } from '../../shared/models/country.model';

export enum CoreActionTypes {
  LoadCountries = '[Core] Load Countries',
  LoadCountriesSuccess = '[Core] Load Countries Success'
}

export class LoadCountries implements Action {
  readonly type = CoreActionTypes.LoadCountries;

  constructor() { }
}

export class LoadCountriesSuccess implements Action {
  readonly type = CoreActionTypes.LoadCountriesSuccess;

  constructor(public payload: Country[]) { }
}

export type CoreActions = LoadCountries | LoadCountriesSuccess;
