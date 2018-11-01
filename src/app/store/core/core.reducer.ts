import { Country } from '../../shared/models/country.model';
import { CoreActionTypes, CoreActions } from './core.actions';


export interface CoreState {
  countries: Country[];
}

export const initialState: CoreState = {
  countries: []
};

export function coreReducer(state = initialState, action: CoreActions): CoreState {
  switch (action.type) {

    case CoreActionTypes.LoadCountriesSuccess: {
      return {
        ...state,
        countries: action.payload
      };
    }

    default:
      return state;
  }
}
