import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { CoreActions, CoreActionTypes, LoadCountriesSuccess } from './core.actions';
import { CountriesService } from '../../shared/services/countries.service';

@Injectable()
export class CoreEffects {

  @Effect()
  loadCountries$: Observable<CoreActions> = this.actions$.pipe(
    ofType(CoreActionTypes.LoadCountries),
    mergeMap(() =>
      this.countriesService.getAllCountries().pipe(
        map(c => (new LoadCountriesSuccess(c))),
        // TODO: catchError(() => of({ type: 'LOGIN_FAILED' }))
      )
    )
  );

  constructor(private actions$: Actions, private countriesService: CountriesService) { }
}
