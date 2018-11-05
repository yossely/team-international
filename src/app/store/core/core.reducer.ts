import { Country } from '../../shared/models/country.model';
import { CoreActionTypes, CoreActions } from './core.actions';


export interface CoreState {
  countries: Country[];
  loadingCountries: boolean;
  errorLoadingCountries?: boolean;
}

export const initialState: CoreState = {
  countries: [],
  loadingCountries: false,
};

export function coreReducer(state = initialState, action: CoreActions): CoreState {
  switch (action.type) {

    case CoreActionTypes.LoadCountries: {
      const loadingCountries = !!state.countries.length ? false : true;
      return {
        ...state,
        loadingCountries,
        errorLoadingCountries: false
      };
    }

    case CoreActionTypes.LoadCountriesSuccess: {
      return {
        ...state,
        loadingCountries: false,
        countries: action.payload,
        errorLoadingCountries: false
      };
    }

    case CoreActionTypes.LoadCountriesFailed: {
      return {
        ...state,
        loadingCountries: false,
        errorLoadingCountries: true
      };
    }

    default:
      return state;
  }
}
