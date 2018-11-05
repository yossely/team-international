import { Action } from '@ngrx/store';
import { Country } from '../../shared/models/country.model';

export enum CoreActionTypes {
  LoadCountries = '[Core] Load Countries',
  LoadCountriesSuccess = '[Core] Load Countries Success',
  LoadCountriesFailed = '[Core] Load Countries Failed',
}

export class LoadCountries implements Action {
  readonly type = CoreActionTypes.LoadCountries;

  constructor() { }
}

export class LoadCountriesSuccess implements Action {
  readonly type = CoreActionTypes.LoadCountriesSuccess;

  constructor(public payload: Country[]) { }
}

export class LoadCountriesFailed implements Action {
  readonly type = CoreActionTypes.LoadCountriesFailed;

  constructor() { }
}

export type CoreActions = LoadCountries | LoadCountriesSuccess | LoadCountriesFailed;
