import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CoreActions, CoreActionTypes, LoadCountriesSuccess, LoadCountriesFailed } from './core.actions';
import { CountriesService } from '../../shared/services/countries.service';

import { Observable, EMPTY } from 'rxjs';
import { mergeMap, map, take, catchError } from 'rxjs/operators';

@Injectable()
export class CoreEffects {

  @Effect()
  loadCountries$: Observable<CoreActions> = this.actions$.pipe(
    ofType(CoreActionTypes.LoadCountries),
    mergeMap(() =>
      this.countriesService.getAllCountries().pipe(
        map(c => new LoadCountriesSuccess(c)),
        catchError(() => {
          this.store.dispatch(new LoadCountriesFailed());
          return EMPTY;
        })
      )
    ),
    take(1)
  );

  constructor(
    private actions$: Actions,
    private countriesService: CountriesService,
    private store: Store<AppState>
  ) { }
}
